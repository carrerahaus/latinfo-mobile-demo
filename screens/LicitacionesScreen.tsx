import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import { getClient } from '../lib/client';

export default function LicitacionesScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const handleSearch = async () => {
    setError(null);
    setResults([]);
    setLatency(null);
    setLoading(true);

    try {
      const client = await getClient();
      if (!client) {
        setError('No hay API Key configurada');
        setLoading(false);
        return;
      }

      const start = Date.now();
      const licitaciones = await client.pe.licitaciones({
        q: query,
        limit: 10,
      });
      const end = Date.now();
      setLatency(end - start);

      if (!licitaciones || licitaciones.length === 0) {
        setError('No encontrado');
      } else {
        setResults(licitaciones);
      }
    } catch (e: any) {
      setError(`Error de red: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Buscar licitaciones</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Ejemplo: construcción"
        style={globalStyles.input}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSearch}>
        <Text style={globalStyles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <Text style={globalStyles.status}>⏳ Buscando...</Text>}
      {error && <Text style={[globalStyles.status, { color: 'red' }]}>{error}</Text>}
      {latency !== null && (
        <Text style={globalStyles.status}>Latencia: {latency} ms</Text>
      )}

      <FlatList
        style={{ marginTop: 20, width: '100%' }}
        data={results}
        keyExtractor={(item, index) => `${item.id || index}`}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={globalStyles.label}>Título: {item.title}</Text>
            <Text style={globalStyles.label}>Comprador: {item.buyer}</Text>
            <Text style={globalStyles.label}>
              Monto: {item.amount} {item.currency}
            </Text>
            <Text style={globalStyles.label}>Estado: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

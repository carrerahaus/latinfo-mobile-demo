import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import { getClient } from '../lib/client';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const client = await getClient();
        if (client) {
          setIsOfflineAvailable(client.pe.isOffline);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
    })();
  }, []);

  const handleSearch = async (mode: 'online' | 'offline') => {
    setError(null);
    setResults([]);
    setLoading(true);

    try {
      const client = await getClient();
      if (!client) {
        setError('No hay API Key configurada');
        setLoading(false);
        return;
      }

      let data;
      if (mode === 'online') {
        data = await client.pe.search(query);
      } else {
        if (!client.pe.isOffline) {
          setError('Modo offline no disponible');
          setLoading(false);
          return;
        }
        data = await client.pe.searchOffline(query);
      }

      if (!data || data.length === 0) {
        setError('No encontrado');
      } else {
        setResults(data);
      }
    } catch (e: any) {
      setError(`Error de red: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Buscar por nombre</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Introduce nombre o razón social"
        style={globalStyles.input}
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => handleSearch('online')}
      >
        <Text style={globalStyles.buttonText}>Buscar online</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          globalStyles.button,
          globalStyles.buttonSecondary,
          !isOfflineAvailable ? { opacity: 0.5 } : null,
        ]}
        onPress={() => handleSearch('offline')}
        disabled={!isOfflineAvailable}
      >
        <Text style={globalStyles.buttonText}>Buscar offline</Text>
      </TouchableOpacity>

      {loading && <Text style={globalStyles.status}>⏳ Buscando...</Text>}
      {error && <Text style={[globalStyles.status, { color: 'red' }]}>{error}</Text>}

      <FlatList
        style={{ marginTop: 20, width: '100%' }}
        data={results}
        keyExtractor={(item) => item.ruc}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={globalStyles.label}>RUC: {item.ruc}</Text>
            <Text style={globalStyles.label}>Razón Social: {item.razon_social}</Text>
            <Text style={globalStyles.label}>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { getClient } from '../lib/client';

export default function LookupScreen() {
  const [ruc, setRuc] = useState('');
  const [result, setResult] = useState<any>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setResult(null);
    setLatency(null);

    if (ruc.length !== 11) {
      setError('El RUC debe tener 11 dígitos');
      return;
    }

    try {
      const start = Date.now();
      const client = await getClient();
      if (!client) {
        setError('No hay API Key configurada');
        return;
      }
      const data = await client.pe.ruc(ruc);
      const end = Date.now();
      setLatency(end - start);

      if (!data) {
        setError('No encontrado');
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setError(`Error de red: ${e.message}`);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>RUC</Text>
      <TextInput
        value={ruc}
        onChangeText={setRuc}
        placeholder="Introduce RUC (11 dígitos)"
        keyboardType="numeric"
        style={globalStyles.input}
        maxLength={11}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSearch}>
        <Text style={globalStyles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {error && <Text style={[globalStyles.status, { color: 'red' }]}>{error}</Text>}

      {result && (
        <View style={{ marginTop: 20, width: '100%' }}>
          <Text style={globalStyles.label}>Razón Social: {result.razon_social}</Text>
          <Text style={globalStyles.label}>Estado: {result.estado}</Text>
          <Text style={globalStyles.label}>Condición: {result.condicion}</Text>
          <Text style={globalStyles.label}>Ubigeo: {result.ubigeo}</Text>
          <Text style={globalStyles.label}>Dirección: {result.direccion}</Text>
          {latency !== null && (
            <Text style={globalStyles.status}>Latencia: {latency} ms</Text>
          )}
        </View>
      )}
    </View>
  );
}

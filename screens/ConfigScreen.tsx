import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { setToken } from '../lib/client';

export default function ConfigScreen() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError('La API Key no puede estar vacía');
        return;
    }

    try {
      await setToken(apiKey);
      setError(null); // limpiar error
      alert('API Key guardada');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>API Key</Text>
      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Introduce tu API Key"
        style={globalStyles.input}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSaveApiKey}>
        <Text style={globalStyles.buttonText}>Guardar API Key</Text>
      </TouchableOpacity>

      {error && (
        <Text style={[globalStyles.status, { color: 'red', marginTop: 10 }]}>
          Error: {error}
        </Text>
      )}
    </View>
  );
}

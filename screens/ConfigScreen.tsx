import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { setToken } from '../lib/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigScreen() {
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      const storedKey = await AsyncStorage.getItem('API_KEY');
      setHasApiKey(!!storedKey);
    };
    checkApiKey();
  }, []);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError('La API Key no puede estar vacía');
        return;
    }

    try {
      await setToken(apiKey);
      setError(null);
      alert('API Key guardada');
      setApiKey('');
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
      {hasApiKey && (
        <Text style={globalStyles.status}>
          API Key guardada
        </Text>
      )}

      {error && (
        <Text style={[globalStyles.status, { color: 'red', marginTop: 10 }]}>
          Error: {error}
        </Text>
      )}
    </View>
  );
}

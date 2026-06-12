import AsyncStorage from '@react-native-async-storage/async-storage';
import { Latinfo } from '@carrerahaus/latinfo';

let _client: Latinfo | null = null;

export async function setToken(apiKey: string) {
  await AsyncStorage.setItem('API_KEY', apiKey);
  _client = new Latinfo(apiKey);
}

export async function clearToken() {
  await AsyncStorage.removeItem('API_KEY');
  _client = null;
}

export async function getClient(): Promise<Latinfo | null> {
  if (!_client) {
    const apiKey = await AsyncStorage.getItem('API_KEY');
    if (apiKey) {
      _client = new Latinfo(apiKey);
    }
  }
  return _client;
}
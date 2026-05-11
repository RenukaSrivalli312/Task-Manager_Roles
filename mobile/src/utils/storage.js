import AsyncStorageImport from '@react-native-async-storage/async-storage';

const AsyncStorage = AsyncStorageImport?.default || AsyncStorageImport;

export const storageKeys = {
  token: 'auth_token',
  user: 'auth_user',
};

export async function setAuthSession(token, user) {
  await AsyncStorage.multiSet([
    [storageKeys.token, token],
    [storageKeys.user, JSON.stringify(user)],
  ]);
}

export async function clearAuthSession() {
  await AsyncStorage.multiRemove([storageKeys.token, storageKeys.user]);
}

export async function getAuthSession() {
  const [token, userJson] = await AsyncStorage.multiGet([
    storageKeys.token,
    storageKeys.user,
  ]);
  const authToken = token?.[1] || null;
  const user = userJson?.[1] ? JSON.parse(userJson[1]) : null;
  return { token: authToken, user };
}

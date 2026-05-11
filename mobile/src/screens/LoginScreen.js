import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import AppScreen from '../components/AppScreen';
import { colors } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login, getErrorMessage } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailError = !form.email ? 'Email is required.' : '';
  const passwordError = !form.password ? 'Password is required.' : '';

  const onSubmit = async () => {
    if (emailError || passwordError) {
      setError('Please fill all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(form);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen scroll>
      <View style={styles.topSpace} />
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue managing tasks</Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={form.email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(value) => setForm((prev) => ({ ...prev, email: value.trim() }))}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
        style={styles.input}
      />
      <HelperText type="error" visible={Boolean(error)}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading} style={styles.button}>
        Sign In
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Signup')} textColor={colors.primary}>
        Don&apos;t have an account? Sign up
      </Button>
      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Demo roles</Text>
        <Text style={styles.demoText}>Admin or User accounts can sign in from your backend data.</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  topSpace: { height: 60 },
  title: { fontSize: 30, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: 4, marginBottom: 24, color: colors.subtitle, fontSize: 14 },
  input: { marginBottom: 12, backgroundColor: colors.surface },
  button: { marginTop: 6, marginBottom: 6, borderRadius: 12, paddingVertical: 4 },
  demoBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    backgroundColor: colors.surface,
  },
  demoTitle: { fontWeight: '700', color: colors.text, marginBottom: 4 },
  demoText: { color: colors.subtitle, fontSize: 13 },
});

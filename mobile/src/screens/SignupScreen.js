import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, HelperText, SegmentedButtons, TextInput } from 'react-native-paper';
import AppScreen from '../components/AppScreen';
import { colors } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const { signup, getErrorMessage } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signup(form);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen scroll>
      <View style={styles.topSpace} />
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Join TaskFlow and stay organized</Text>
      <TextInput
        mode="outlined"
        label="Full name"
        value={form.name}
        onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
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
      <Text style={styles.roleLabel}>Select role</Text>
      <SegmentedButtons
        value={form.role}
        onValueChange={(value) => setForm((prev) => ({ ...prev, role: value }))}
        buttons={[
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' },
        ]}
        style={styles.segment}
      />
      <HelperText type="error" visible={Boolean(error)}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading} style={styles.button}>
        Create Account
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()} textColor={colors.primary}>
        Already have an account? Sign in
      </Button>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  topSpace: { height: 44 },
  title: { fontSize: 30, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: 4, marginBottom: 22, color: colors.subtitle, fontSize: 14 },
  input: { marginBottom: 12, backgroundColor: colors.surface },
  roleLabel: { color: colors.subtitle, marginBottom: 8, fontWeight: '600' },
  segment: { marginBottom: 10 },
  button: { marginTop: 8, marginBottom: 6, borderRadius: 12, paddingVertical: 4 },
});

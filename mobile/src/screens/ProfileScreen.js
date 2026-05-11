import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AppScreen from '../components/AppScreen';
import { useAppColors } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const colors = useAppColors();
  const scheme = useColorScheme();
  const { user, logout } = useAuth();
  const nameInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <AppScreen>
      <LinearGradient colors={['#2563EB', '#3B82F6']} style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{nameInitial}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Unknown User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email'}</Text>
        <View style={styles.roleChip}>
          <Text style={styles.roleText}>{user?.role === 'admin' ? 'Administrator' : 'Team Member'}</Text>
        </View>
      </LinearGradient>
      <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}> 
        <Text style={[styles.infoLabel, { color: colors.text }]}>Account</Text>
        <Text style={[styles.infoRow, { color: colors.subtitle }]}>Name: {user?.name}</Text>
        <Text style={[styles.infoRow, { color: colors.subtitle }]}>Email: {user?.email}</Text>
        <Text style={[styles.infoRow, { color: colors.subtitle }]}>Role: {user?.role}</Text>
        <Text style={[styles.infoRow, { color: colors.subtitle }]}>Theme: {scheme === 'dark' ? 'Dark' : 'Light'}</Text>
      </View>
      <Button mode="outlined" textColor={colors.danger} style={styles.logout} onPress={logout}>
        Sign Out
      </Button>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECF0F7',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DCE7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 30, fontWeight: '800', color: '#2563EB' },
  name: { marginTop: 12, fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  email: { color: '#E7EEFF', marginTop: 3 },
  roleChip: {
    marginTop: 10,
    backgroundColor: '#EDF2FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  roleText: { color: '#2563EB', fontWeight: '700', fontSize: 12 },
  infoCard: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECF0F7',
    padding: 16,
  },
  infoLabel: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  infoRow: { marginBottom: 6 },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resetButton: {
    marginTop: 8,
  },
  logout: { marginTop: 14, borderRadius: 12, borderColor: '#F7DDE0' },
});

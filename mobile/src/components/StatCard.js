import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, shadows } from '../theme/theme';

export default function StatCard({ label, value, tint }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.label, { color: tint || colors.subtitle }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFF2F8',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    ...shadows.card,
  },
  value: { fontSize: 20, color: colors.text, fontWeight: '700' },
  label: { marginTop: 4, fontWeight: '600', fontSize: 12 },
});

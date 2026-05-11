import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/theme';

export default function TaskCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={[styles.line, { width: '62%', height: 16 }]} />
      <View style={[styles.line, { width: '100%' }]} />
      <View style={[styles.line, { width: '84%' }]} />
      <View style={[styles.line, { width: '45%', marginTop: 10 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    marginBottom: 12,
  },
  line: {
    height: 12,
    borderRadius: 8,
    backgroundColor: '#EEF2FA',
    marginBottom: 10,
  },
});

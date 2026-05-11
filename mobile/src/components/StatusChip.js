import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';
import { normalizeStatus } from '../utils/helpers';

function getColors(status) {
  const value = normalizeStatus(status);
  if (value === 'Completed') {
    return { bg: '#EAFBF1', fg: colors.completed };
  }
  if (value === 'In Progress') {
    return { bg: '#EAF0FF', fg: colors.inProgress };
  }
  return { bg: '#FFF7E8', fg: colors.pending };
}

export default function StatusChip({ status }) {
  const normalized = normalizeStatus(status);
  const scheme = getColors(normalized);
  return (
    <View style={[styles.container, { backgroundColor: scheme.bg }]}>
      <View style={[styles.dot, { backgroundColor: scheme.fg }]} />
      <Text style={[styles.text, { color: scheme.fg }]}>{normalized}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  dot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  text: { fontSize: 12, fontWeight: '600' },
});

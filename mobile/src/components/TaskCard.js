import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import StatusChip from './StatusChip';
import { colors, shadows } from '../theme/theme';
import { formatDate } from '../utils/helpers';

export default function TaskCard({ task, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title}
        </Text>
        <StatusChip status={task.status} />
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {task.description || 'No description'}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.meta}>Assignee: {task.assignedTo?.name || task.assigneeName || 'Unassigned'}</Text>
        <Text style={styles.meta}>Due: {formatDate(task.dueDate)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...shadows.card,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1, marginRight: 8 },
  description: { color: colors.subtitle, fontSize: 13, lineHeight: 19, marginBottom: 10 },
  footer: { borderTopWidth: 1, borderTopColor: '#F0F2F7', paddingTop: 8 },
  meta: { fontSize: 12, color: '#475467', marginBottom: 2 },
});

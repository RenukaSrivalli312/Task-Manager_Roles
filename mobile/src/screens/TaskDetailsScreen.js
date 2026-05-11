import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import AppScreen from '../components/AppScreen';
import StatusChip from '../components/StatusChip';
import { useAppColors } from '../theme/theme';
import { formatDate, normalizeStatus, statusToApi } from '../utils/helpers';
import { deleteTask, updateTask } from '../services/taskService';
import { getApiErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusButtons = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export default function TaskDetailsScreen({ route, navigation }) {
  const colors = useAppColors();
  const { user } = useAuth();
  const task = route.params?.task;
  const isAdmin = String(user?.role || '').toLowerCase() === 'admin';
  const [status, setStatus] = useState(statusToApi(task?.status || 'pending'));
  const [dueDate, setDueDate] = useState(task?.dueDate ? String(task.dueDate).slice(0, 10) : '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [loading, setLoading] = useState(false);
  const currentDisplayStatus = useMemo(() => normalizeStatus(status), [status]);

  const onUpdate = async () => {
    if (!task) return;
    setLoading(true);
    try {
      const payload = isAdmin
        ? { status, dueDate: dueDate || null, priority }
        : { status };
      await updateTask(task._id || task.id, payload);
      Alert.alert('Success', 'Task updated successfully.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', getApiErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => {
    if (!task || !isAdmin) return;
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(task._id || task.id);
            Alert.alert('Deleted', 'Task deleted successfully.');
            navigation.goBack();
          } catch (e) {
            Alert.alert('Error', getApiErrorMessage(e));
          }
        },
      },
    ]);
  };

  if (!task) {
    return (
      <AppScreen>
        <Text style={styles.error}>Task details unavailable.</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen scroll>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description || 'No description available.'}</Text>
        <StatusChip status={currentDisplayStatus} />
        <View style={styles.meta}>
          <Text style={styles.metaItem}>Assigned to: {task.assignedTo?.name || task.assigneeName || 'Unassigned'}</Text>
          <Text style={styles.metaItem}>Due date: {formatDate(dueDate)}</Text>
          <Text style={styles.metaItem}>Priority: {priority}</Text>
        </View>
      </View>
      <Text style={[styles.label, { color: colors.text }]}>Update status</Text>
      <SegmentedButtons value={status} onValueChange={setStatus} buttons={statusButtons} />
      {isAdmin ? (
        <View style={styles.adminBlock}>
          <TextInput
            mode="outlined"
            label="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
            style={styles.input}
          />
          <Text style={[styles.label, { color: colors.text }]}>Priority</Text>
          <SegmentedButtons
            value={priority}
            onValueChange={setPriority}
            buttons={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
        </View>
      ) : null}
      <Button mode="contained" style={styles.btn} onPress={onUpdate} loading={loading} disabled={loading}>
        Save Changes
      </Button>
      {isAdmin ? (
        <Button mode="outlined" textColor="#EF4444" style={styles.deleteBtn} onPress={onDelete}>
          Delete Task
        </Button>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAF0F8',
    padding: 16,
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  description: { marginTop: 8, color: '#667085', lineHeight: 21 },
  meta: { marginTop: 14, borderTopWidth: 1, borderTopColor: '#EEF2F7', paddingTop: 10 },
  metaItem: { fontSize: 13, color: '#475467', marginBottom: 5 },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  btn: { marginTop: 16, borderRadius: 12 },
  deleteBtn: { marginTop: 10, borderRadius: 12, borderColor: '#F5B6BD' },
  adminBlock: { marginTop: 14, gap: 10 },
  input: { backgroundColor: '#FFFFFF' },
  error: { color: '#EF4444' },
});

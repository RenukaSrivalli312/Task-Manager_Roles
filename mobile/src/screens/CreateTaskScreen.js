import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, HelperText, SegmentedButtons, TextInput } from 'react-native-paper';
import AppScreen from '../components/AppScreen';
import { useAppColors } from '../theme/theme';
import { createTask, getUsers } from '../services/taskService';
import { getApiErrorMessage } from '../services/api';

export default function CreateTaskScreen() {
  const colors = useAppColors();
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    assignedTo: '',
  });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      try {
        const data = await getUsers();
        const list = Array.isArray(data) ? data : data.users || data.data || [];
        setUsers(list.map((u) => ({ label: u.name, value: u._id || u.id })));
      } catch {
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  const submit = async () => {
    if (!form.title.trim()) {
      setError('Task title is required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await createTask({
        title: form.title,
        description: form.description,
        dueDate: form.dueDate || undefined,
        status: form.status,
        priority: form.priority,
        assignedTo: form.assignedTo || undefined,
      });
      Alert.alert('Success', 'Task created successfully.');
      setForm({ title: '', description: '', dueDate: '', status: 'pending', priority: 'medium', assignedTo: '' });
    } catch (e) {
      setError(getApiErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppScreen scroll>
      <Text style={[styles.title, { color: colors.text }]}>New Task</Text>
      <Text style={[styles.subtitle, { color: colors.subtitle }]}>Create and assign a task to your team</Text>
      <TextInput
        mode="outlined"
        label="Title"
        value={form.title}
        onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}
        style={[styles.input, { backgroundColor: colors.surface }]}
      />
      <TextInput
        mode="outlined"
        label="Description"
        value={form.description}
        onChangeText={(value) => setForm((prev) => ({ ...prev, description: value }))}
        multiline
        numberOfLines={4}
        style={[styles.input, { backgroundColor: colors.surface }]}
      />
      <TextInput
        mode="outlined"
        label="Due Date (YYYY-MM-DD)"
        value={form.dueDate}
        onChangeText={(value) => setForm((prev) => ({ ...prev, dueDate: value }))}
        style={[styles.input, { backgroundColor: colors.surface }]}
      />
      <Text style={[styles.label, { color: colors.subtitle }]}>Status</Text>
      <SegmentedButtons
        value={form.status}
        onValueChange={(value) => setForm((prev) => ({ ...prev, status: value }))}
        buttons={[
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ]}
      />
      <Text style={[styles.label, { marginTop: 14, color: colors.subtitle }]}>Priority</Text>
      <SegmentedButtons
        value={form.priority}
        onValueChange={(value) => setForm((prev) => ({ ...prev, priority: value }))}
        buttons={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
      />
      <Text style={[styles.label, { marginTop: 14, color: colors.subtitle }]}>Assign To</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        <TouchableOpacity
          onPress={() => setForm((prev) => ({ ...prev, assignedTo: '' }))}
          style={[styles.userChip, !form.assignedTo && styles.userChipActive]}
        >
          <Text style={[styles.userChipText, !form.assignedTo && styles.userChipTextActive]}>Unassigned</Text>
        </TouchableOpacity>
        {users.map((user) => (
          <TouchableOpacity
            key={user.value}
            onPress={() => setForm((prev) => ({ ...prev, assignedTo: user.value }))}
            style={[styles.userChip, form.assignedTo === user.value && styles.userChipActive]}
          >
            <Text style={[styles.userChipText, form.assignedTo === user.value && styles.userChipTextActive]}>{user.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loadingUsers ? <Text style={[styles.hint, { color: colors.subtitle }]}>Loading users...</Text> : null}
      <HelperText type="error" visible={Boolean(error)}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={submit} loading={submitting} disabled={submitting} style={styles.button}>
        Create Task
      </Button>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { marginBottom: 18 },
  input: { marginBottom: 12 },
  label: { marginBottom: 8, fontWeight: '600' },
  hint: { marginTop: 8, fontSize: 12 },
  button: { marginTop: 8, borderRadius: 12, paddingVertical: 4 },
  chipsRow: { paddingVertical: 2 },
  userChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DDE3F0',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  userChipActive: { backgroundColor: '#EAF0FF', borderColor: '#2563EB' },
  userChipText: { color: '#475467', fontWeight: '600' },
  userChipTextActive: { color: '#1D4ED8' },
});

import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Searchbar, SegmentedButtons } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AppScreen from '../components/AppScreen';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import TaskCardSkeleton from '../components/TaskCardSkeleton';
import StatCard from '../components/StatCard';
import { useAppColors } from '../theme/theme';
import { getApiErrorMessage } from '../services/api';
import { getTasks } from '../services/taskService';
import { normalizeStatus } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Done' },
];

export default function TasksScreen({ navigation }) {
  const colors = useAppColors();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(
    async (mode = 'initial') => {
      try {
        if (mode === 'initial') setLoading(true);
        if (mode === 'refresh') setRefreshing(true);
        setError('');
        const params = {};
        if (status !== 'all') params.status = status;
        const data = await getTasks(params);
        const list = Array.isArray(data) ? data : data.tasks || data.data || [];
        setTasks(list);
      } catch (e) {
        setError(getApiErrorMessage(e));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [status]
  );

  useFocusEffect(
    useCallback(() => {
      fetchTasks('initial');
    }, [fetchTasks])
  );

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const text = `${task.title} ${task.description || ''}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesPriority = priority === 'all' || (task.priority || 'medium') === priority;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priority]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => normalizeStatus(t.status) === 'Pending').length;
    const active = tasks.filter((t) => normalizeStatus(t.status) === 'In Progress').length;
    const done = tasks.filter((t) => normalizeStatus(t.status) === 'Completed').length;
    return { total, pending, active, done };
  }, [tasks]);

  return (
    <AppScreen>
      <LinearGradient
        colors={['#2563EB', '#3B82F6', '#60A5FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <Text style={styles.bannerTitle}>{user?.role === 'admin' ? 'Admin Dashboard' : 'My Tasks'}</Text>
        <Text style={styles.bannerSubtitle}>Stay on top of every task with real-time updates.</Text>
      </LinearGradient>
      <Searchbar
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
        style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}
        inputStyle={{ minHeight: 0 }}
      />
      <View style={styles.statsRow}>
        <StatCard label="Total" value={stats.total} tint={colors.text} />
        <StatCard label="Pending" value={stats.pending} tint={colors.pending} />
        <StatCard label="Active" value={stats.active} tint={colors.inProgress} />
        <StatCard label="Done" value={stats.done} tint={colors.completed} />
      </View>
      <SegmentedButtons value={status} onValueChange={setStatus} buttons={statusFilters} style={styles.segment} />
      <SegmentedButtons
        value={priority}
        onValueChange={setPriority}
        buttons={[
          { value: 'all', label: 'All Priorities' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ]}
        style={styles.segment}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <View>
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => String(item._id || item.id)}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchTasks('refresh')} />}
          renderItem={({ item }) => (
            <TaskCard task={item} onPress={() => navigation.navigate('TaskDetails', { task: item })} />
          )}
          ListEmptyComponent={<EmptyState title="No tasks found" subtitle="Try adjusting search or filter." />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  banner: { borderRadius: 16, paddingVertical: 16, paddingHorizontal: 14, marginBottom: 12 },
  bannerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  bannerSubtitle: { marginTop: 4, color: '#E8EEFF' },
  search: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  segment: { marginBottom: 10 },
  error: { marginBottom: 8, color: '#EF4444' },
});

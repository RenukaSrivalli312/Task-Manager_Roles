export function formatDate(dateValue) {
  if (!dateValue) {
    return 'No due date';
  }
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return 'No due date';
  }
  return date.toLocaleDateString();
}

export function normalizeStatus(status) {
  const raw = String(status || '').toLowerCase();
  if (raw.includes('progress')) {
    return 'In Progress';
  }
  if (raw.includes('complete') || raw.includes('done')) {
    return 'Completed';
  }
  return 'Pending';
}

export function statusToApi(status) {
  const normalized = normalizeStatus(status);
  if (normalized === 'In Progress') {
    return 'in-progress';
  }
  if (normalized === 'Completed') {
    return 'completed';
  }
  return 'pending';
}

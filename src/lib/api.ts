// Client-side API wrapper — replaces the old window.tasklet.sqlExec calls

const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};
const pendingFns: Record<string, () => void> = {};
function debounce(key: string, fn: () => void, ms = 1500) {
  if (debounceTimers[key]) clearTimeout(debounceTimers[key]);
  pendingFns[key] = fn;
  debounceTimers[key] = setTimeout(() => {
    delete pendingFns[key];
    fn();
  }, ms);
}

// Flush all pending saves immediately (call before navigation / page unload)
export function flushPendingSaves() {
  Object.keys(pendingFns).forEach(key => {
    if (debounceTimers[key]) clearTimeout(debounceTimers[key]);
    pendingFns[key]();
    delete pendingFns[key];
    delete debounceTimers[key];
  });
}

// Coerce 0/1/true/false/"true"/"false" → boolean for Prisma Boolean fields
function normalize(data: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = { ...data };
  for (const k of ['completed', 'contacted']) {
    if (out[k] !== undefined && out[k] !== null) {
      out[k] = out[k] === true || out[k] === 1 || out[k] === '1' || out[k] === 'true';
    }
  }
  // Empty string dueDate → null (Prisma DateTime?)
  if (out.dueDate === '' || out.dueDate === undefined) out.dueDate = out.dueDate === '' ? null : out.dueDate;
  return out;
}

async function fetchJSON(url: string, opts?: RequestInit) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Sessions
export const getSessions = () => fetchJSON('/api/sessions');

export const createSession = (title: string, date: string) =>
  fetchJSON('/api/sessions', { method: 'POST', body: JSON.stringify({ title, date }) });

export const getSession = (id: string) => fetchJSON(`/api/sessions/${id}`);

export const updateSession = (id: string, data: Record<string, any>) =>
  fetchJSON(`/api/sessions/${id}`, { method: 'PATCH', body: JSON.stringify(normalize(data)) });

// Keys
export const updateKeyEntry = (id: string, data: Record<string, any>) => {
  debounce(`key-${id}`, () => {
    fetchJSON('/api/keys', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
  });
};

// Health
export const updateHealthEntry = (id: string, data: Record<string, any>) => {
  debounce(`health-${id}`, () => {
    fetchJSON('/api/health', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
  });
};

// Health Goals
export const addHealthGoal = (sabbaticalId: string, area: string) =>
  fetchJSON('/api/health-goals', { method: 'POST', body: JSON.stringify({ sabbaticalId, area }) });

export const updateHealthGoal = (id: string, data: Record<string, any>) => {
  debounce(`hgoal-${id}`, () => {
    fetchJSON(`/api/health-goals/${id}`, { method: 'PATCH', body: JSON.stringify(normalize(data)) });
  });
};

export const deleteHealthGoal = (id: string) =>
  fetchJSON(`/api/health-goals/${id}`, { method: 'DELETE' });

// Goals
export const updateGoal = (id: string, data: Record<string, any>) => {
  debounce(`goal-${id}`, () => {
    fetchJSON('/api/goals', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
  });
};

// People
export const updatePerson = (id: string, data: Record<string, any>) => {
  debounce(`person-${id}`, () => {
    fetchJSON('/api/people', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
  });
};

// Reflections
export const updateReflection = (id: string, data: Record<string, any>) => {
  debounce(`ref-${id}`, () => {
    fetchJSON('/api/reflections', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
  });
};

// ── Immediate (non-debounced) versions used by Save All button ──
export const updateKeyEntryNow = (id: string, data: Record<string, any>) =>
  fetchJSON('/api/keys', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
export const updateHealthEntryNow = (id: string, data: Record<string, any>) =>
  fetchJSON('/api/health', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
export const updateHealthGoalNow = (id: string, data: Record<string, any>) =>
  fetchJSON(`/api/health-goals/${id}`, { method: 'PATCH', body: JSON.stringify(normalize(data)) });
export const updateGoalNow = (id: string, data: Record<string, any>) =>
  fetchJSON('/api/goals', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
export const updatePersonNow = (id: string, data: Record<string, any>) =>
  fetchJSON('/api/people', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });
export const updateReflectionNow = (id: string, data: Record<string, any>) =>
  fetchJSON('/api/reflections', { method: 'PATCH', body: JSON.stringify({ id, ...normalize(data) }) });

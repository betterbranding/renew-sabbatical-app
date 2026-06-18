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
  fetchJSON(`/api/sessions/${id}`, { method: 'PATCH', body: JSON.stringify(data) });

// Keys
export const updateKeyEntry = (id: string, data: Record<string, any>) => {
  debounce(`key-${id}`, () => {
    fetchJSON('/api/keys', { method: 'PATCH', body: JSON.stringify({ id, ...data }) });
  });
};

// Health
export const updateHealthEntry = (id: string, data: Record<string, any>) => {
  debounce(`health-${id}`, () => {
    fetchJSON('/api/health', { method: 'PATCH', body: JSON.stringify({ id, ...data }) });
  });
};

// Health Goals
export const addHealthGoal = (sabbaticalId: string, area: string) =>
  fetchJSON('/api/health-goals', { method: 'POST', body: JSON.stringify({ sabbaticalId, area }) });

export const updateHealthGoal = (id: string, data: Record<string, any>) => {
  debounce(`hgoal-${id}`, () => {
    fetchJSON(`/api/health-goals/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  });
};

export const deleteHealthGoal = (id: string) =>
  fetchJSON(`/api/health-goals/${id}`, { method: 'DELETE' });

// Goals
export const updateGoal = (id: string, data: Record<string, any>) => {
  debounce(`goal-${id}`, () => {
    fetchJSON('/api/goals', { method: 'PATCH', body: JSON.stringify({ id, ...data }) });
  });
};

// People
export const updatePerson = (id: string, data: Record<string, any>) => {
  debounce(`person-${id}`, () => {
    fetchJSON('/api/people', { method: 'PATCH', body: JSON.stringify({ id, ...data }) });
  });
};

// Reflections
export const updateReflection = (id: string, data: Record<string, any>) => {
  debounce(`ref-${id}`, () => {
    fetchJSON('/api/reflections', { method: 'PATCH', body: JSON.stringify({ id, ...data }) });
  });
};

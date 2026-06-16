import { Session, KeyEntry, HealthEntry, HealthGoal, Goal, Person, Reflection } from '../types';

const esc = (s: string) => s.replace(/'/g, "''");

// ── Debounce helper ──
const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};
function debounce(key: string, fn: () => void, ms = 1500) {
  if (debounceTimers[key]) clearTimeout(debounceTimers[key]);
  debounceTimers[key] = setTimeout(fn, ms);
}

// ── Sequential exec helper (one statement at a time) ──
async function execAll(stmts: string[]): Promise<void> {
  for (const s of stmts) {
    await window.tasklet.sqlExec(s);
  }
}

// ── Init — one CREATE TABLE per call ──
let dbReady = false;
export async function initDB() {
  if (dbReady) return;
  await execAll([
    `CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, title TEXT NOT NULL, date TEXT NOT NULL, status TEXT DEFAULT 'new')`,
    `CREATE TABLE IF NOT EXISTS keys_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, module_key TEXT, name TEXT, tags TEXT DEFAULT '[]', time_allotted TEXT DEFAULT '', user_response TEXT DEFAULT '', completed INTEGER DEFAULT 0, sort_order INTEGER DEFAULT 0)`,
    `CREATE TABLE IF NOT EXISTS health_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, area TEXT, assessment TEXT DEFAULT '', due_date TEXT, completed INTEGER DEFAULT 0, feel_if_accomplish TEXT DEFAULT '', what_if_dont TEXT DEFAULT '')`,
    `CREATE TABLE IF NOT EXISTS health_goals (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, area TEXT, goal_text TEXT DEFAULT '', status TEXT DEFAULT 'Not started', due_date TEXT, sort_order INTEGER DEFAULT 0)`,
    `CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, name TEXT DEFAULT '', area TEXT, due_date TEXT, completed INTEGER DEFAULT 0, notes TEXT DEFAULT '')`,
    `CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, name TEXT DEFAULT '', area TEXT, contacted INTEGER DEFAULT 0, notes TEXT DEFAULT '')`,
    `CREATE TABLE IF NOT EXISTS reflections (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, how_will_i_feel TEXT DEFAULT '', what_if_i_dont TEXT DEFAULT '')`,
  ]);
  dbReady = true;
}

// ── Sessions ──
export async function getSessions(): Promise<Session[]> {
  return await window.tasklet.sqlQuery('SELECT * FROM sessions ORDER BY date DESC') as unknown as Session[];
}

export async function createSession(id: string, title: string, date: string): Promise<void> {
  await window.tasklet.sqlExec(`INSERT INTO sessions (id, title, date, status) VALUES ('${esc(id)}', '${esc(title)}', '${esc(date)}', 'new')`);
}

export async function updateSessionStatus(id: string, status: string): Promise<void> {
  await window.tasklet.sqlExec(`UPDATE sessions SET status = '${esc(status)}' WHERE id = '${esc(id)}'`);
}

// ── Keys to the Kingdom ──
export async function getKeysEntries(sessionId: string): Promise<KeyEntry[]> {
  return await window.tasklet.sqlQuery(`SELECT * FROM keys_entries WHERE session_id = '${esc(sessionId)}' ORDER BY sort_order`) as unknown as KeyEntry[];
}

export async function upsertKeyEntry(entry: KeyEntry): Promise<void> {
  const doSave = async () => {
    if (entry.id) {
      await window.tasklet.sqlExec(`UPDATE keys_entries SET user_response = '${esc(entry.user_response)}', completed = ${entry.completed} WHERE id = ${entry.id}`);
    } else {
      await window.tasklet.sqlExec(`INSERT INTO keys_entries (session_id, module_key, name, tags, time_allotted, user_response, completed, sort_order) VALUES ('${esc(entry.session_id)}', '${esc(entry.module_key)}', '${esc(entry.name)}', '${esc(entry.tags)}', '${esc(entry.time_allotted)}', '${esc(entry.user_response)}', ${entry.completed}, ${entry.sort_order})`);
    }
  };
  debounce(`key-${entry.id || entry.session_id + entry.module_key}`, doSave);
}

// ── Health Entries ──
export async function getHealthEntries(sessionId: string): Promise<HealthEntry[]> {
  return await window.tasklet.sqlQuery(`SELECT * FROM health_entries WHERE session_id = '${esc(sessionId)}'`) as unknown as HealthEntry[];
}

export async function upsertHealthEntry(entry: HealthEntry): Promise<void> {
  const doSave = async () => {
    const feelVal = esc(entry.feel_if_accomplish || '');
    const whatVal = esc(entry.what_if_dont || '');
    if (entry.id) {
      await window.tasklet.sqlExec(`UPDATE health_entries SET assessment = '${esc(entry.assessment)}', due_date = ${entry.due_date ? `'${esc(entry.due_date)}'` : 'NULL'}, completed = ${entry.completed}, feel_if_accomplish = '${feelVal}', what_if_dont = '${whatVal}' WHERE id = ${entry.id}`);
    } else {
      await window.tasklet.sqlExec(`INSERT INTO health_entries (session_id, area, assessment, due_date, completed, feel_if_accomplish, what_if_dont) VALUES ('${esc(entry.session_id)}', '${esc(entry.area)}', '${esc(entry.assessment)}', ${entry.due_date ? `'${esc(entry.due_date)}'` : 'NULL'}, ${entry.completed}, '${feelVal}', '${whatVal}')`);
    }
  };
  debounce(`health-${entry.id || entry.session_id + entry.area}`, doSave);
}

// ── Health Goals (per-area goal tracker) ──
export async function getHealthGoals(sessionId: string, area?: string): Promise<HealthGoal[]> {
  if (area) {
    return await window.tasklet.sqlQuery(`SELECT * FROM health_goals WHERE session_id = '${esc(sessionId)}' AND area = '${esc(area)}' ORDER BY sort_order`) as unknown as HealthGoal[];
  }
  return await window.tasklet.sqlQuery(`SELECT * FROM health_goals WHERE session_id = '${esc(sessionId)}' ORDER BY area, sort_order`) as unknown as HealthGoal[];
}

export async function addHealthGoal(sessionId: string, area: string): Promise<HealthGoal> {
  // Get current max sort_order
  const existing = await window.tasklet.sqlQuery(`SELECT MAX(sort_order) as max_order FROM health_goals WHERE session_id = '${esc(sessionId)}' AND area = '${esc(area)}'`) as unknown as any[];
  const nextOrder = (existing[0]?.max_order ?? -1) + 1;
  await window.tasklet.sqlExec(`INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('${esc(sessionId)}', '${esc(area)}', '', 'Not started', NULL, ${nextOrder})`);
  const rows = await window.tasklet.sqlQuery(`SELECT * FROM health_goals WHERE session_id = '${esc(sessionId)}' AND area = '${esc(area)}' ORDER BY sort_order DESC LIMIT 1`) as unknown as HealthGoal[];
  return rows[0];
}

export async function updateHealthGoal(id: number, goalText: string, status: string, dueDate: string | null): Promise<void> {
  const doSave = async () => {
    await window.tasklet.sqlExec(`UPDATE health_goals SET goal_text = '${esc(goalText)}', status = '${esc(status)}', due_date = ${dueDate ? `'${esc(dueDate)}'` : 'NULL'} WHERE id = ${id}`);
  };
  debounce(`hgoal-${id}`, doSave);
}

export async function deleteHealthGoal(id: number): Promise<void> {
  await window.tasklet.sqlExec(`DELETE FROM health_goals WHERE id = ${id}`);
}

// ── Goals (High Five) ──
export async function getGoals(sessionId: string): Promise<Goal[]> {
  return await window.tasklet.sqlQuery(`SELECT * FROM goals WHERE session_id = '${esc(sessionId)}'`) as unknown as Goal[];
}

export async function upsertGoal(goal: Goal): Promise<void> {
  const doSave = async () => {
    if (goal.id) {
      await window.tasklet.sqlExec(`UPDATE goals SET name = '${esc(goal.name)}', due_date = ${goal.due_date ? `'${esc(goal.due_date)}'` : 'NULL'}, completed = ${goal.completed}, notes = '${esc(goal.notes)}' WHERE id = ${goal.id}`);
    } else {
      await window.tasklet.sqlExec(`INSERT INTO goals (session_id, name, area, due_date, completed, notes) VALUES ('${esc(goal.session_id)}', '${esc(goal.name)}', '${esc(goal.area)}', ${goal.due_date ? `'${esc(goal.due_date)}'` : 'NULL'}, ${goal.completed}, '${esc(goal.notes)}')`);
    }
  };
  debounce(`goal-${goal.id || goal.session_id + goal.area}`, doSave);
}

// ── People ──
export async function getPeople(sessionId: string): Promise<Person[]> {
  return await window.tasklet.sqlQuery(`SELECT * FROM people WHERE session_id = '${esc(sessionId)}'`) as unknown as Person[];
}

export async function upsertPerson(person: Person): Promise<void> {
  const doSave = async () => {
    if (person.id) {
      await window.tasklet.sqlExec(`UPDATE people SET name = '${esc(person.name)}', contacted = ${person.contacted}, notes = '${esc(person.notes)}' WHERE id = ${person.id}`);
    } else {
      await window.tasklet.sqlExec(`INSERT INTO people (session_id, name, area, contacted, notes) VALUES ('${esc(person.session_id)}', '${esc(person.name)}', '${esc(person.area)}', ${person.contacted}, '${esc(person.notes)}')`);
    }
  };
  debounce(`person-${person.id || person.session_id + person.area}`, doSave);
}

// ── Reflections ──
export async function getReflection(sessionId: string): Promise<Reflection | null> {
  const rows = await window.tasklet.sqlQuery(`SELECT * FROM reflections WHERE session_id = '${esc(sessionId)}'`) as unknown as Reflection[];
  return rows.length > 0 ? rows[0] : null;
}

export async function upsertReflection(r: Reflection): Promise<void> {
  const doSave = async () => {
    if (r.id) {
      await window.tasklet.sqlExec(`UPDATE reflections SET how_will_i_feel = '${esc(r.how_will_i_feel)}', what_if_i_dont = '${esc(r.what_if_i_dont)}' WHERE id = ${r.id}`);
    } else {
      await window.tasklet.sqlExec(`INSERT INTO reflections (session_id, how_will_i_feel, what_if_i_dont) VALUES ('${esc(r.session_id)}', '${esc(r.how_will_i_feel)}', '${esc(r.what_if_i_dont)}')`);
    }
  };
  debounce(`reflection-${r.id || r.session_id}`, doSave);
}

// ── Seed a new session with empty templates ──
export async function seedNewSession(sessionId: string): Promise<void> {
  const { DAY1_MODULES, HEALTH_AREAS } = await import('../types');
  const stmts: string[] = [];

  for (let i = 0; i < DAY1_MODULES.length; i++) {
    const m = DAY1_MODULES[i];
    stmts.push(`INSERT INTO keys_entries (session_id, module_key, name, tags, time_allotted, user_response, completed, sort_order) VALUES ('${esc(sessionId)}', '${esc(m.key)}', '${esc(m.name)}', '${esc(JSON.stringify(m.tags))}', '${esc(m.time)}', '', 0, ${i})`);
  }

  for (const area of HEALTH_AREAS) {
    stmts.push(`INSERT INTO health_entries (session_id, area, assessment, due_date, completed, feel_if_accomplish, what_if_dont) VALUES ('${esc(sessionId)}', '${esc(area.name)}', '', NULL, 0, '', '')`);
  }

  // Seed 3 blank health goals per area
  for (const area of HEALTH_AREAS) {
    for (let i = 0; i < 3; i++) {
      stmts.push(`INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('${esc(sessionId)}', '${esc(area.name)}', '', 'Not started', NULL, ${i})`);
    }
  }

  for (const area of HEALTH_AREAS) {
    stmts.push(`INSERT INTO goals (session_id, name, area, due_date, completed, notes) VALUES ('${esc(sessionId)}', '', '${esc(area.name.replace(' Health', ''))}', NULL, 0, '')`);
  }

  for (const area of HEALTH_AREAS) {
    stmts.push(`INSERT INTO people (session_id, name, area, contacted, notes) VALUES ('${esc(sessionId)}', '', '${esc(area.name)}', 0, '')`);
  }

  stmts.push(`INSERT INTO reflections (session_id, how_will_i_feel, what_if_i_dont) VALUES ('${esc(sessionId)}', '', '')`);

  await execAll(stmts);
}

// ── Seed from JSON — seeds all missing sessions ──
const SEED_VERSION = 2; // Bump to force full re-seed
export async function seedFromJSON(): Promise<void> {
  // Check seed version — if outdated, drop all data and re-seed
  let needsFullReseed = false;
  try {
    const vRows = await window.tasklet.sqlQuery("SELECT val FROM app_meta WHERE key = 'seed_version'") as unknown as any[];
    if (!vRows.length || Number(vRows[0].val) < SEED_VERSION) needsFullReseed = true;
  } catch {
    // Table doesn't exist yet
    needsFullReseed = true;
  }

  if (needsFullReseed) {
    await execAll([
      'CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, val TEXT)',
      'DELETE FROM sessions',
      'DELETE FROM keys_entries',
      'DELETE FROM health_entries',
      'DELETE FROM health_goals',
      'DELETE FROM goals',
      'DELETE FROM people',
      'DELETE FROM reflections',
    ]);
  }

  const existing = await getSessions();
  const existingIds = new Set(existing.map(s => s.id));

  const raw = await window.tasklet.readFileFromDisk('/tasklet/agent/home/renew-sabbatical-app/database/seed-data.json');
  const data = JSON.parse(raw);

  const statements: string[] = [];

  for (const s of data.sessions) {
    if (existingIds.has(s.id)) continue; // Skip already-seeded sessions

    statements.push(`INSERT OR IGNORE INTO sessions (id, title, date, status) VALUES ('${esc(s.id)}', '${esc(s.title)}', '${esc(s.date)}', '${esc(s.status)}')`);

    const moduleMap: Record<string, string> = { 'Reverence': 'reverence', 'Release': 'release', 'Repent': 'repent', 'Respond': 'respond', 'Receive': 'receive' };
    const keys = s.day1?.keysToTheKingdom || [];
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const mk = moduleMap[k.name] || k.name.toLowerCase().replace(/\s+/g, '-');
      if (mk === 'day-1-overview') continue;
      statements.push(`INSERT INTO keys_entries (session_id, module_key, name, tags, time_allotted, user_response, completed, sort_order) VALUES ('${esc(s.id)}', '${esc(mk)}', '${esc(k.name)}', '${esc(JSON.stringify(k.tags || []))}', '${esc(k.time || '')}', '', 1, ${i})`);
    }

    const health = s.day2?.hi5Health || [];
    for (const h of health) {
      if (h.name === 'Day 2 Overview') continue;
      const feel = esc(h.feelIfAccomplish || '');
      const dont = esc(h.whatIfDont || '');
      statements.push(`INSERT INTO health_entries (session_id, area, assessment, due_date, completed, feel_if_accomplish, what_if_dont) VALUES ('${esc(s.id)}', '${esc(h.name)}', '', ${h.dueDate ? `'${esc(h.dueDate)}'` : 'NULL'}, 1, '${feel}', '${dont}')`);
    }

    // Seed health_goals from historical data if available
    const healthGoals = s.day2?.healthGoals || [];
    for (const hg of healthGoals) {
      statements.push(`INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('${esc(s.id)}', '${esc(hg.area || '')}', '${esc(hg.goalText || hg.name || '')}', '${esc(hg.status || 'Not started')}', ${hg.dueDate ? `'${esc(hg.dueDate)}'` : 'NULL'}, ${hg.sortOrder || 0})`);
    }

    // If no health_goals in seed data, create 3 blank per area from health entries
    if (healthGoals.length === 0 && health.length > 0) {
      for (const h of health) {
        if (h.name === 'Day 2 Overview') continue;
        for (let gi = 0; gi < 3; gi++) {
          statements.push(`INSERT INTO health_goals (session_id, area, goal_text, status, due_date, sort_order) VALUES ('${esc(s.id)}', '${esc(h.name)}', '', 'Not started', NULL, ${gi})`);
        }
      }
    }

    const goals = s.day2?.highFiveGoals || [];
    for (const g of goals) {
      statements.push(`INSERT INTO goals (session_id, name, area, due_date, completed, notes) VALUES ('${esc(s.id)}', '${esc(g.name)}', '${esc(g.tag || '')}', ${g.dueDate ? `'${esc(g.dueDate)}'` : 'NULL'}, ${g.completed ? 1 : 0}, '')`);
    }

    const people = s.day2?.highFivePeople || [];
    for (const p of people) {
      statements.push(`INSERT INTO people (session_id, name, area, contacted, notes) VALUES ('${esc(s.id)}', '${esc(p.name)}', '${esc(p.tag || '')}', ${p.contacted ? 1 : 0}, '')`);
    }

    const ref = s.day2?.reflections;
    if (ref) {
      statements.push(`INSERT INTO reflections (session_id, how_will_i_feel, what_if_i_dont) VALUES ('${esc(s.id)}', '${esc(ref.howWillIFeel || '')}', '${esc(ref.whatHappensIfIDont || '')}')`);
    }
  }

  if (statements.length > 0) {
    await execAll(statements);
  }

  // Update seed version
  await window.tasklet.sqlExec(`INSERT OR REPLACE INTO app_meta (key, val) VALUES ('seed_version', '${SEED_VERSION}')`);
}

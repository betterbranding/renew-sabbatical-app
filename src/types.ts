// Matches Prisma models for client use
export interface Sabbatical {
  id: string;
  userId: string;
  title: string;
  date: string;
  status: string;
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KeyEntry {
  id: string;
  sabbaticalId: string;
  moduleKey: string;
  name: string;
  tags: string;
  timeAllotted: string;
  userResponse: string;
  completed: boolean;
  sortOrder: number;
}

export interface HealthEntry {
  id: string;
  sabbaticalId: string;
  area: string;
  assessment: string;
  dueDate: string | null;
  completed: boolean;
  feelIfAccomplish: string;
  whatIfDont: string;
}

export interface HealthGoal {
  id: string;
  sabbaticalId: string;
  area: string;
  goalText: string;
  status: string;
  dueDate: string | null;
  sortOrder: number;
}

export interface Goal {
  id: string;
  sabbaticalId: string;
  name: string;
  area: string;
  dueDate: string | null;
  completed: boolean;
  notes: string;
}

export interface Person {
  id: string;
  sabbaticalId: string;
  name: string;
  area: string;
  contacted: boolean;
  notes: string;
}

export interface Reflection {
  id: string;
  sabbaticalId: string;
  howWillIFeel: string;
  whatIfIDont: string;
}

export interface SabbaticalFull extends Sabbatical {
  keyEntries: KeyEntry[];
  healthEntries: HealthEntry[];
  healthGoals: HealthGoal[];
  goals: Goal[];
  people: Person[];
  reflections: Reflection[];
}

// Lesson module definitions (static content)
export interface LessonStep {
  title: string;
  type: 'teaching' | 'scripture' | 'prayer' | 'action' | 'journal' | 'video' | 'expandable' | 'reference';
  icon?: string;
  color?: string;
  content: string;
  expandable?: boolean;
  subSteps?: LessonStep[];
}

export interface LessonModule {
  id: string;
  title: string;
  icon: string;
  tags: string[];
  time: string;
  summary: string;
  steps: LessonStep[];
  journalPrompt?: string;
}

export const HEALTH_AREAS = [
  { key: 'spiritual', name: 'Spiritual Health', icon: '✝️', color: '#5BA4E6', prompt: 'How is your spiritual life? What needs attention?' },
  { key: 'relational', name: 'Relational Health', icon: '❤️', color: '#E6855B', prompt: 'How are your key relationships? What needs investment or repair?' },
  { key: 'financial', name: 'Financial Health', icon: '💰', color: '#5BE6A4', prompt: 'How is your financial situation? Where do you want to be?' },
  { key: 'mental', name: 'Mental Health', icon: '🧠', color: '#E6E65B', prompt: 'How is your mental state? Are you learning, growing, managing stress?' },
  { key: 'physical', name: 'Physical Health', icon: '💪', color: '#B55BE6', prompt: 'How is your body? Exercise, nutrition, sleep, energy?' },
];

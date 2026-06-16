// ── Data types ──
export interface Session {
  id: string;
  title: string;
  date: string;
  status: 'new' | 'in-progress' | 'completed';
}

export interface KeyEntry {
  id?: number;
  session_id: string;
  module_key: string;
  name: string;
  tags: string;
  time_allotted: string;
  user_response: string;
  completed: number;
  sort_order: number;
}

export interface HealthEntry {
  id?: number;
  session_id: string;
  area: string;
  assessment: string;
  due_date: string | null;
  completed: number;
  feel_if_accomplish: string;
  what_if_dont: string;
}

export interface HealthGoal {
  id?: number;
  session_id: string;
  area: string;
  goal_text: string;
  status: string; // 'Not started' | 'In progress' | 'Done'
  due_date: string | null;
  sort_order: number;
}

export interface Goal {
  id?: number;
  session_id: string;
  name: string;
  area: string;
  due_date: string | null;
  completed: number;
  notes: string;
}

export interface Person {
  id?: number;
  session_id: string;
  name: string;
  area: string;
  contacted: number;
  notes: string;
}

export interface Reflection {
  id?: number;
  session_id: string;
  how_will_i_feel: string;
  what_if_i_dont: string;
}

// ── Lesson module definitions ──
export interface LessonModule {
  key: string;
  name: string;
  icon: string;
  tags: string[];
  time: string;
  description: string;
  prompt: string;
  scripture?: string;
}

export const DAY1_MODULES: LessonModule[] = [
  {
    key: 'reverence',
    name: 'Reverence',
    icon: '🙏',
    tags: ['Acknowledge'],
    time: '10 mins',
    description: 'Begin by acknowledging God\'s presence and sovereignty over your life. Set aside distractions and center yourself in worship.',
    prompt: 'Write out your acknowledgment. What are you grateful for? How do you see God\'s hand in your life right now?',
    scripture: '"Be still, and know that I am God." — Psalm 46:10',
  },
  {
    key: 'release',
    name: 'Release',
    icon: '🕊️',
    tags: ['Confession', 'Forgiveness'],
    time: '30 mins',
    description: 'Release what\'s been weighing on you. Confess anything you\'ve been carrying — guilt, unforgiveness, bitterness — and let it go.',
    prompt: 'What do you need to confess? Who do you need to forgive? Write it out and release it.',
    scripture: '"If we confess our sins, He is faithful and just to forgive us." — 1 John 1:9',
  },
  {
    key: 'repent',
    name: 'Repent',
    icon: '🔄',
    tags: ['Repent', 'Renounce'],
    time: '20 mins',
    description: 'Turn away from patterns, habits, or mindsets that are not aligned with who you\'re called to be. Renounce what needs to end.',
    prompt: 'What patterns or habits do you need to turn away from? What are you renouncing today?',
    scripture: '"Repent, then, and turn to God, so that your sins may be wiped out." — Acts 3:19',
  },
  {
    key: 'respond',
    name: 'Respond',
    icon: '📝',
    tags: ['Journal', 'Seek'],
    time: '30 mins',
    description: 'Now respond to what God is showing you. Journal your thoughts, seek direction, and write down what\'s on your heart.',
    prompt: 'What is God saying to you right now? What are you seeking Him for? Write your response.',
    scripture: '"Call to me and I will answer you and tell you great and unsearchable things." — Jeremiah 33:3',
  },
  {
    key: 'receive',
    name: 'Receive',
    icon: '✨',
    tags: ['Soak', 'Hear', 'Journal', 'Confirm'],
    time: '1-2 hours',
    description: 'The longest and most important module. Soak in God\'s presence, listen for His voice, journal what you hear, and seek confirmation.',
    prompt: 'What are you hearing? What has been confirmed? What promises are you standing on? Take your time here.',
    scripture: '"My sheep hear my voice, and I know them, and they follow me." — John 10:27',
  },
];

export const HEALTH_AREAS = [
  { key: 'spiritual', name: 'Spiritual Health', icon: '✝️', color: '#5BA4E6', prompt: 'How is your spiritual life? What needs attention? What practices are you maintaining or neglecting?' },
  { key: 'relational', name: 'Relational Health', icon: '❤️', color: '#E6855B', prompt: 'How are your key relationships? Marriage, family, friendships — what needs investment or repair?' },
  { key: 'financial', name: 'Financial Health', icon: '💰', color: '#5BE6A4', prompt: 'How is your financial situation? Debts, savings, generosity — where do you stand and where do you want to be?' },
  { key: 'mental', name: 'Mental Health', icon: '🧠', color: '#E6E65B', prompt: 'How is your mental state? Are you learning, growing, managing stress? What\'s occupying your mind?' },
  { key: 'physical', name: 'Physical Health', icon: '💪', color: '#B55BE6', prompt: 'How is your body? Exercise, nutrition, sleep, energy — what\'s your honest assessment?' },
];

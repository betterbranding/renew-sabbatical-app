import { prisma } from './prisma';

const MODULES = [
  { key: 'reverence', name: 'Reverence', tags: '["Acknowledge"]', time: '10 mins', order: 0 },
  { key: 'release', name: 'Release', tags: '["Confession","Forgiveness"]', time: '30 mins', order: 1 },
  { key: 'repent', name: 'Repent', tags: '["Repent","Renounce"]', time: '20 mins', order: 2 },
  { key: 'respond', name: 'Respond', tags: '["Journal","Seek"]', time: '30 mins', order: 3 },
  { key: 'receive', name: 'Receive', tags: '["Soak","Hear","Journal","Confirm"]', time: '1-2 hours', order: 4 },
];

const HEALTH_AREAS = [
  'Spiritual Health',
  'Relational Health',
  'Financial Health',
  'Mental Health',
  'Physical Health',
];

export async function seedDemoForUser(userId: string) {
  const existing = await prisma.sabbatical.count({ where: { userId } });
  if (existing > 0) return;

  const demo = await prisma.sabbatical.create({
    data: {
      userId,
      title: 'RE:NEW | Demo Session',
      date: new Date(),
      status: 'new',
      isDemo: true,
    },
  });

  // Day 1 Keys modules
  await prisma.keyEntry.createMany({
    data: MODULES.map((m) => ({
      sabbaticalId: demo.id,
      moduleKey: m.key,
      name: m.name,
      tags: m.tags,
      timeAllotted: m.time,
      sortOrder: m.order,
    })),
  });

  // Day 2 Health areas + goals + people
  for (const area of HEALTH_AREAS) {
    await prisma.healthEntry.create({
      data: { sabbaticalId: demo.id, area },
    });

    await prisma.healthGoal.createMany({
      data: [0, 1, 2].map((i) => ({
        sabbaticalId: demo.id,
        area,
        sortOrder: i,
      })),
    });

    await prisma.goal.create({
      data: { sabbaticalId: demo.id, area: area.replace(' Health', '') },
    });

    await prisma.person.create({
      data: { sabbaticalId: demo.id, area },
    });
  }

  await prisma.reflection.create({
    data: { sabbaticalId: demo.id },
  });
}

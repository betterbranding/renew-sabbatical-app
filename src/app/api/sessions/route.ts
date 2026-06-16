import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';
import { seedDemoForUser } from '@/lib/seed-demo';

export async function GET() {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  // Seed demo on first visit
  await seedDemoForUser(userId);

  const sabbaticals = await prisma.sabbatical.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(sabbaticals);
}

export async function POST(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { title, date } = await req.json();

  const sabbatical = await prisma.sabbatical.create({
    data: { userId, title, date: new Date(date), status: 'new' },
  });

  // Seed blank templates
  const modules = [
    { key: 'reverence', name: 'Reverence', tags: '["Acknowledge"]', time: '10 mins', order: 0 },
    { key: 'release', name: 'Release', tags: '["Confession","Forgiveness"]', time: '30 mins', order: 1 },
    { key: 'repent', name: 'Repent', tags: '["Repent","Renounce"]', time: '20 mins', order: 2 },
    { key: 'respond', name: 'Respond', tags: '["Journal","Seek"]', time: '30 mins', order: 3 },
    { key: 'receive', name: 'Receive', tags: '["Soak","Hear","Journal","Confirm"]', time: '1-2 hours', order: 4 },
  ];

  await prisma.keyEntry.createMany({
    data: modules.map((m) => ({
      sabbaticalId: sabbatical.id,
      moduleKey: m.key,
      name: m.name,
      tags: m.tags,
      timeAllotted: m.time,
      sortOrder: m.order,
    })),
  });

  const areas = ['Spiritual Health', 'Relational Health', 'Financial Health', 'Mental Health', 'Physical Health'];

  for (const area of areas) {
    await prisma.healthEntry.create({ data: { sabbaticalId: sabbatical.id, area } });
    await prisma.healthGoal.createMany({
      data: [0, 1, 2].map((i) => ({ sabbaticalId: sabbatical.id, area, sortOrder: i })),
    });
    await prisma.goal.create({ data: { sabbaticalId: sabbatical.id, area: area.replace(' Health', '') } });
    await prisma.person.create({ data: { sabbaticalId: sabbatical.id, area } });
  }

  await prisma.reflection.create({ data: { sabbaticalId: sabbatical.id } });

  return NextResponse.json(sabbatical);
}

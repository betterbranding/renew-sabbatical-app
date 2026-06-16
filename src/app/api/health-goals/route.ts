import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function POST(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { sabbaticalId, area } = await req.json();

  // Verify ownership
  const sab = await prisma.sabbatical.findFirst({ where: { id: sabbaticalId, userId } });
  if (!sab) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const maxOrder = await prisma.healthGoal.aggregate({
    where: { sabbaticalId, area },
    _max: { sortOrder: true },
  });

  const goal = await prisma.healthGoal.create({
    data: {
      sabbaticalId,
      area,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(goal);
}

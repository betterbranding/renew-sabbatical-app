import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();
  const { id } = await params;
  const sabbatical = await prisma.sabbatical.findFirst({
    where: { id, userId },
    include: {
      keyEntries: { orderBy: { sortOrder: 'asc' } },
      healthEntries: true,
      healthGoals: { orderBy: [{ area: 'asc' }, { sortOrder: 'asc' }] },
      goals: true,
      people: true,
      reflections: true,
    },
  });
  if (!sabbatical) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(sabbatical);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();
  const { id } = await params;
  const data = await req.json();
  const existing = await prisma.sabbatical.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const updated = await prisma.sabbatical.update({ where: { id }, data });
  return NextResponse.json(updated);
}

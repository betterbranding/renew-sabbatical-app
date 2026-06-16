import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function PATCH(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { id, ...data } = await req.json();

  const entry = await prisma.healthEntry.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!entry || entry.sabbatical.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.healthEntry.update({ where: { id }, data });
  return NextResponse.json(updated);
}

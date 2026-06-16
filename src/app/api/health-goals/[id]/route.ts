import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();
  const { id } = await params;
  const data = await req.json();
  const goal = await prisma.healthGoal.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!goal || goal.sabbatical.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const updated = await prisma.healthGoal.update({
    where: { id },
    data: {
      ...(data.goalText !== undefined && { goalText: data.goalText }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();
  const { id } = await params;
  const goal = await prisma.healthGoal.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!goal || goal.sabbatical.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await prisma.healthGoal.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

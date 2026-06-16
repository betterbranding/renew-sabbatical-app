import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function PATCH(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { id, ...data } = await req.json();

  const goal = await prisma.goal.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!goal || goal.sabbatical.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.goal.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.completed !== undefined && { completed: data.completed }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
    },
  });

  return NextResponse.json(updated);
}

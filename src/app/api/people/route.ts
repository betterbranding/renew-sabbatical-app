import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function PATCH(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { id, ...data } = await req.json();

  const person = await prisma.person.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!person || person.sabbatical.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.person.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.contacted !== undefined && { contacted: data.contacted }),
      ...(data.notes !== undefined && { notes: data.notes }),
    },
  });

  return NextResponse.json(updated);
}

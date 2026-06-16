import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function PATCH(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { id, userResponse, completed } = await req.json();

  // Verify ownership through sabbatical
  const entry = await prisma.keyEntry.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!entry || entry.sabbatical.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.keyEntry.update({
    where: { id },
    data: {
      ...(userResponse !== undefined && { userResponse }),
      ...(completed !== undefined && { completed }),
    },
  });

  return NextResponse.json(updated);
}

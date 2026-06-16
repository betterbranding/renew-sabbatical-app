import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, unauthorized } from '@/lib/auth-helpers';

export async function PATCH(req: Request) {
  const userId = await getAuthUser();
  if (!userId) return unauthorized();

  const { id, ...data } = await req.json();

  const ref = await prisma.reflection.findUnique({
    where: { id },
    include: { sabbatical: { select: { userId: true } } },
  });
  if (!ref || ref.sabbatical.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.reflection.update({
    where: { id },
    data: {
      ...(data.howWillIFeel !== undefined && { howWillIFeel: data.howWillIFeel }),
      ...(data.whatIfIDont !== undefined && { whatIfIDont: data.whatIfIDont }),
    },
  });

  return NextResponse.json(updated);
}

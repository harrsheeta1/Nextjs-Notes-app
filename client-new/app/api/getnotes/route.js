import { NextResponse } from 'next/server';
import verifyToken from '@/lib/verifyToken';
import prisma from '@/lib/prisma'; // assumes prisma client is here

export async function GET(req) {
  const result = verifyToken(req);
  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: 401 });
  }

  const userId = result.userId;

  try {
    const notes = await prisma.post.findMany({
      where: { userId }, // Prisma should match your schema field
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ message: 'Server error while fetching notes' }, { status: 500 });
  }
}

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();
  
  if (!username || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { username } });

  if (existing) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: { username, password }
  });

  return NextResponse.json({ message: 'User created' });
}

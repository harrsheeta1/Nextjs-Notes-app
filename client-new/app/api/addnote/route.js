// app/api/addnote/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import verifyToken from '@/lib/verifyToken';

export async function POST(req) {
  const result = verifyToken(req);
  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: 401 });
  }

  const { userId } = result;
  const { noteText } = await req.json();

  if (!noteText) {
    return NextResponse.json({ message: 'Note text is required' }, { status: 400 });
  }

  try {
    await prisma.post.create({
      data: {
        body: noteText,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ message: 'Note added successfully' });
  } catch (error) {
    console.error('Error adding note:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

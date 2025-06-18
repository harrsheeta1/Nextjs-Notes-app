// app/api/deletenote/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import verifyToken from '@/lib/verifyToken';

export async function DELETE(req) {
  const result = verifyToken(req);
  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: 401 });
  }

  const { userId } = result;
  const { noteText } = await req.json();

  if (!noteText) {
    return NextResponse.json({ message: 'Note data is required' }, { status: 400 });
  }

  try {
    const deleted = await prisma.post.deleteMany({
      where: {
        body: noteText,
        userId: userId
      }
    });

    if (deleted.count === 0) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

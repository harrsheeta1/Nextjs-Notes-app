
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import verifyToken from '@/lib/verifyToken';

export async function DELETE(req, { params }) {
  const result = verifyToken(req);
  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: 401 });
  }

  const noteId = params.id;

  if (!noteId) {
    return NextResponse.json({ message: 'Note ID is required' }, { status: 400 });
  }

  try {
    const deleted = await prisma.post.delete({
      where: {
        id: noteId,
      },
    });

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ message: 'Note not found or already deleted' }, { status: 404 });
  }
}

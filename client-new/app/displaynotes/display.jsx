"use client";
import { Button } from '@/components/ui/button';

const Display = ({token,setNoteText,notes,fetchNotes}) => {
  
       const handleEdit = (note) => {
        setNoteText(note.body);
          };

    const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;
    try { 

      const res = await fetch(`/api/deletenotebyid/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert('Note deleted');
        fetchNotes(); 
      } else {
        alert(data.message || 'Failed to delete note');
      }
    } catch (error) {
      alert('Server error while deleting note');
    }

  };
  return (
     
     <div className="w-full max-w-xl space-y-4">
  
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-[#1e1e1e] border border-pink-400 rounded-lg p-4 shadow flex justify-between items-start"
          >
            <div
              className="w-full cursor-pointer"
              onClick={() => handleEdit(note)}
            >
               {note.body.slice(0, 20)}...
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                className="bg-orange-300 text-black px-3 py-1 rounded hover:opacity-90"
                onClick={() => handleEdit(note)}
              >
                Edit
              </Button>
              <Button
                className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-90"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
  
  )};
export default Display;

"use client";
import { useState,useEffect } from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import Display from '../displaynotes/display';

const page = () => {
  const [noteText, setNoteText] = useState('');
  const [token, setToken] = useState();
  const [notes, setNotes] = useState([]);
   
  useEffect(() => {
    const tokenn = localStorage.getItem('token');
   setToken(tokenn);
   //fetchNotes(); // Fetch notes after setting the token
  },[]); // it is also asynchrous and hence takes some time to get the token from local storage
        // hence till the fetchNOtes will be undefined and hence in otehr use effect the fetchnotes is called.
  useEffect(() => {
  if (token) {
    fetchNotes();
  }
}, [token]);
  
    const fetchNotes = async () => {
     const res = await fetch('/api/getnotes', {
      headers: { Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json'},
      method:'GET',
    });
      const data = await res.json();
      if (res.ok) 
      {
        if (Array.isArray(data.notes)) {
         setNotes(data.notes); 
       } else {
      setNotes([]); 
        }
      }
      else
      {
        setNotes([]);
      }
     };  
    

  const handleAddNote = async () => {
    if (!noteText.trim()) {
      alert('Please enter a note');
      return;
    }
    try {
      const response = await fetch('/api/addnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({noteText}),
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      const data = await response.json();
         if (response.ok) {
      alert(data.message || 'Note is added');
      fetchNotes(); // Refresh the notes list
      setNoteText('');
           } 
           else
           {
            alert(data.message||'Note is added');
           }
   }catch (error) {
      console.error('Error saving note:', error);
    }
  }

  const handleDeleteNote = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) {
      alert('Ok, cancelling the request for delete');
      return;
    }
      const res = await fetch('/api/deletenote', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteText }),
    });
   
     let data;
    if (res.headers.get('Content-Type')?.includes('application/json')) {
      data = await res.json();
    }
    if (res.ok) {
      alert('Delete successful!');
      fetchNotes(); 
      setNoteText('');
    } else {
      alert(data.message || 'Note is not deleted. Please try again.');
    }
  };


  return (
    <>
       <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-[#ff69b4] mb-10">Welcome to Notes Dashboard</h1>

      <div className="w-full max-w-xl bg-[#1e1e1e] border-2 border-[#ff69b4] rounded-xl p-6 shadow-lg relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button className="bg-[#ffb347] text-black hover:opacity-85" onClick={handleDeleteNote}>
            Delete
          </Button>
          <Button className="bg-[#ff69b4] text-black hover:opacity-85" onClick={handleAddNote}>
            Save
          </Button>
        </div>

        <Textarea
          className="bg-[#2c2c2c] text-white border-[#ff69b4] mt-14 resize-none"
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={30}
        />
      </div>

      <div className='mt-10 w-full max-w-xl'>
         <Display 
          token={token}
          setNoteText={setNoteText}
          notes={notes}
          fetchNotes={fetchNotes}
          />
      </div>
    </div>

    </>
    
  )
}

export default page

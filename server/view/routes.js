const express = require('express');
const router= express.Router();
const Post = require('../model/Post.js'); // Import the Post model
const verifytoken = require('../middleware/auth.js'); // Import the verifytoken middleware
const {loginuser, signupuser} = require('../controllers/postforlogin.js');
const {addNote, deleteNote} = require('../controllers/postforallnotes.js');
const {getall} = require('../controllers/get.js');
router.post('/signup', signupuser,); 
router.post('/login', loginuser); 
router.post('/deletenote',verifytoken, deleteNote);
router.post('/addnote',verifytoken, addNote);
router.get('/getnotes', verifytoken, getall);
router.delete('/deletenote/:id', verifytoken, async (req, res) => {
  // try {
  //   const noteId = req.params.id;
  //   const userId = req.user.id;

  //   // Find the note by ID and ensure it belongs to the user
  //   const note = await Post.findOne({ _id: noteId, user: userId });
  //   if (!note) {
  //     return res.status(404).json({ message: 'Note not found' });
  //   }

  //   // Delete the note
  //   await Post.deleteOne({ _id: noteId ,user: userId});
  //   res.status(200).json({ message: 'Note deleted successfully' });
  // } catch (error) {
  //   console.error('Error deleting note:', error);
  //   res.status(500).json({ message: 'Server error while deleting note' });
  // }

   try {
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).json({ message: 'Note ID is required' });
    }

    const deleted = await Post.findByIdAndDelete(noteId);

    if (!deleted) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error while deleting note' });
  }

});

module.exports = router; // Export the router to be used in the main app
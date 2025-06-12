const express = require('express');
const router= express.Router();

const verifytoken = require('../middleware/auth.js'); // Import the verifytoken middleware
const {loginuser, signupuser} = require('../controllers/postforlogin.js');
const {addNote, deleteNote} = require('../controllers/postforallnotes.js');
router.post('/signup', signupuser,); 
router.post('/login', loginuser); 
router.post('/deletenote',verifytoken, deleteNote);
router.post('/addnote',verifytoken, addNote);

module.exports = router; // Export the router to be used in the main app
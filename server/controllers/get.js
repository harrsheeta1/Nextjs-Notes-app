// const express = require('express');
// const mongoose = require('mongoose');

// const app= express();
// app.get('/posts/:id', async (req, res) => {
//   const postId = req.params.id;

//   try {
//     // Assuming Post is a Mongoose model
//     const post = await mongoose.model('Post').findById(postId).populate('user', 'username email');
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.status(200).json(post);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// app.get('/posts',async(req,res) =>{
      
// });

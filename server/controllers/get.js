const Post = require('../model/Post.js'); // Import the Post model
const getall= async (req, res) => {
   
  try {
    const userId = req.user.id;
    const notes = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }

}

module.exports = { getall }; // Export the getall function to be used in the routes file





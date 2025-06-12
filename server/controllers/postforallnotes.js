
const Post = require('../model/Post.js'); // Import the Post model
 const addNote = async (req, res) => {
    const { noteText } = req.body;
    const userId=req.user.id;
   
    try {
        // Validate input
        if (!noteText) {
            return res.status(400).json({ message: 'Note text is required' });
        }
       const newNote = new Post({
            body: noteText,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: userId
        });
        await newNote.save();
        res.status(200).json({ message: 'Note added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

 const deleteNote = async (req, res) => {     
                
    const { noteText} = req.body;
    try {
        // Validate input
        if (!noteText) {
            return res.status(400).json({ message: 'Note data is required' });
        }

        // Get the user from the request (assuming user is authenticated)
        const userId = req.user.id; // Assuming you have middleware to set req.user
        
        // Find the user and remove the note
        const note = await Post.findOneAndDelete({user: userId ,body: noteText });
        if (!note) {
            return res.status(404).json({ message: 'Note is not saved . First save the data' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }       
}
module.exports = { addNote, deleteNote }; // Export the functions to be used in the routes
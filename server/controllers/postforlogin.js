
const User = require('../model/User.js'); // Import the User model
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Mynotesapp';
const dotenv = require('dotenv');
dotenv.config(); 
 const loginuser=async (req, res) => {
     const {username, password} = req.body;
    try{
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username or password are required' });
    }

    // Check if user exists
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
   if (user.password !== password) {
  return res.status(401).json({ message: 'Invalid password' });
}

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(200).json({message: 'Login successful',token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
 
 const signupuser=async (req, res) => {
    const {username, password} = req.body;
    try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username or Password are required' });
    }

    // Check if user exists
    const user = await User.findOne({username});
    if (user) {
      return res.status(404).json({ message: 'User already exist. Do login' });
    }
    if (user.password !== password) {
  return res.status(401).json({ message: 'Invalid password' });
}
    // Create a new post
    const newuser= new User({
      username,
      password
    });
   console.log("Happy");
    await newuser.save();
    // Respond with success message
    res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = { loginuser, signupuser }; // Export the functions to be used in the routes
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const { json, urlencoded } = require('body-parser'); // Import body-parser middleware for parsing request bodies
const config = require('dotenv').config; // Load environment variables from .env file
const connectDB = require('./config/db'); // Import database connection function
const app = express();      
require('dotenv').config();
config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB   


//const path = require('path');
//app.use(express.static(path.join(__dirname, '../client-new'))); //making the client folder static so that it can be served
 // making the server and client to work on the same port

app.use(json()); // Parse JSON request bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable the frontend and backend to communicate without CORS issues even if they are on different ports or domains

const router = require('./view/routes.js');//middleware for routing
app.use('/api', router); // Use the routes defined in the router module under the '/api' path

const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`); // Log server start
    });

// Handle 404 errors
app.use((req, res) => {     
    res.status(404).json({ message: 'Not Found' }); // Respond with 404 for unknown routes
});









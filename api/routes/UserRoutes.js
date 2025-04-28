// routes/userRoutes.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // model


// Create a secret key (keep this safe in .env file)
const SECRET_KEY = process.env.SECRET_KEY;

// POST METHOD : register
router.post('/register', async (req, res) => {
  try {
    console.log('📥 Incoming data:', req.body);

    // Create user
    const user = await User.create(req.body); 

    // Create JWT token
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Send back user info + token
    res.status(201).json({ user, token });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(400).json({ error: err.message });
  }
});


// POST METHOD : login
router.post('/login', async (req, res) => {
  const { username , password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Check if passwords match (not hashed in this case)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid or password' });
    }
    // Success - send response
    res.status(200).json({ message: 'Login successful', 
      user: {
         id: user._id, 
         name: user.name, 
         username: user.username 
        } 
    });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Server error' });
  }

});

// GET METHOD : Get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    // Extract the ID from the URL parameters
    const userId = req.params.id;
    if(userId == 'null'){
      return res.status(401).json({error : 'Login to System !'})
    }
    // Find the user by their _id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // If the user is found, send back the user data
    res.status(200).json({
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: "securePassword123", // Never expose passwords in the backend directly
        role: user.role,
        profilePicture: user.profilePicture,
        bio: user.bio,
        status: user.status,
        isVerified: user.isVerified || false, // Default to false if not available
        isAdmin: user.isAdmin || false, // Default to false if not available
        address: {
          street: user.address?.street || "123 Main St", // Default value if not available
          city: user.address?.city || "Somewhere",
          state: user.address?.state || "CA",
          country: user.address?.country || "USA"
        },
        phoneNumber: user.phoneNumber || "123-456-7890", // Default to a placeholder if missing
        preferences: {
          language: user.preferences?.language || "en", // Default to English if not set
          theme: user.preferences?.theme || "dark" // Default to dark theme if not set
        },
        subscription: user.subscription,
        location: user.location,
        createdAt: user.createdAt || new Date().toISOString(), // Use current date or from the user object
        updatedAt: user.updatedAt || new Date().toISOString() // Use current date or from the user object
      }
    });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get METHOD : all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});



// POST METHOD : Testing request body and header and params
router.post('/test' , (req , res) => {
  console.log('📥 Body:', req.body);
  res.json({ received: req.body });
})



module.exports = router;


// GET : http://localhost:3000/api/users              GET all User
// POST : http://localhost:3000/api/users/register    register
// POST : http://localhost:3000/api/users/login       login

// POST : http://localhost:3000/api/users/test        test request body

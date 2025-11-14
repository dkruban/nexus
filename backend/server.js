// server.js

// 1. Import Dependencies
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middleware
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Allows to parse JSON

// --- API Routes ---

// A. Instagram Profile Details Route
app.get('/api/instagram', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Using a public, unreliable API for demonstration
    const apiUrl = `https://instaloaderapp.com/api/profile?username=${username}`;

    try {
        const response = await axios.get(apiUrl);
        // The API returns a list, we take the first user
        const userData = response.data.users[0]; 
        
        if (userData) {
            res.json({
                success: true,
                data: {
                    username: userData.username,
                    fullName: userData.full_name,
                    bio: userData.biography,
                    followers: userData.followers,
                    following: userData.following,
                    profilePic: userData.profile_pic_url,
                    isPrivate: userData.is_private,
                    isVerified: userData.is_verified
                }
            });
        } else {
            res.status(404).json({ success: false, error: 'Profile not found' });
        }
    } catch (error) {
        console.error("Instagram API Error:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch Instagram data. API might be down.' });
    }
});

// B. Phone Number Information Route
app.get('/api/phone', async (req, res) => {
    const number = req.query.number;
    const apiKey = process.env.PHONE_API_KEY;

    if (!number || !apiKey) {
        return res.status(400).json({ error: 'Phone number and API key are required' });
    }

    const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${number}&country_code=&format=1`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        if (data.valid) {
            res.json({
                success: true,
                data: {
                    number: data.international_format,
                    country: data.country_name,
                    location: data.location,
                    carrier: data.carrier,
                    lineType: data.line_type
                }
            });
        } else {
            res.status(404).json({ success: false, error: 'Invalid phone number' });
        }
    } catch (error) {
        console.error("Phone API Error:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch phone data. Check API key.' });
    }
});


// 4. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

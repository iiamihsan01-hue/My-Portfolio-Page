require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('./models/User');
const Project = require('./models/Project');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
    console.error('FATAL ERROR: MONGODB_URI is not defined.');
    process.exit(1);
}

mongoose.connect(dbUri)
    .then(async () => {
        console.log('✅ MongoDB Connected to Cloud');
    })
    .catch(err => {
        console.error('❌ MongoDB Initial Connection Error:', err);
    });

mongoose.connection.on('error', err => {
    console.error('❌ MongoDB Runtime Error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB Disconnected');
});

// --- PUBLIC ROUTES ---

// Projects (Read Only for Public)
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

// Messages (Contact Form - Public)
app.post('/api/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.json({ message: 'Sent' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Default Route -> Serves the main portfolio page
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

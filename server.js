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
        // Seed Admin User
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({ username: 'admin', password: hashedPassword });
            console.log('Admin user created: admin / password123');
        }
    })
    .catch(err => console.log('MongoDB Error:', err));

// Auth Middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// --- ROUTES ---

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.header('auth-token', token).json({ token });
});

// Projects
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

app.post('/api/projects', auth, async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.json(savedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', auth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Messages (Contact Form)
app.post('/api/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.json({ message: 'Sent' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/messages', auth, async (req, res) => {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
});


// Serve Admin Panel explicitly if needed, although static 'public' handles it if structured right.
// Default Route -> Serves the main portfolio page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

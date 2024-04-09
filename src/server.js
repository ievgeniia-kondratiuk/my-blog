//Connect Mongoose to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true })

//Schema and model used by post and get
const postSchema = new mongoose.Schema({ title: String, content: String });
const Post = mongoose.model('Post', postSchema);

const express = require('express');
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express
// middleware that can be used to enable CORS with various options. Make sure it is installed.
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware to parse JSON requests
app.use(express.json());
// Enable CORS for all origins
app.use(cors());

// Route to get all blog posts from database
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
 }); 

app.get('/api/homeData', (req, res) => {
    const homeData = {
        message: 'Welcome to our website! Explore our blog for interesting articles.'
    };
    res.json(homeData);
});

// Route to create a new blog post in the database
app.post('/api/posts', async (req, res) => {
    console.log('Received POST request:', req.body);
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const newPost = await Post.create({title, content });
    res.status(201).json(newPost);
 });
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
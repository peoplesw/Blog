const express = require("express");
const app = express();
const Post = require('./api/models/posts');
const postsData = new Post();

// Middleware to allow access to data.json info
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Middleware, makes photos static (available to public)
app.use('/uploads', express.static('uploads'));

// Home page
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

// View an Individual Post
app.get('/api/posts/:post_id', (req, res) => {
    const requestedPostId = req.params['post_id']
    const individualPost = postsData.getIndividualPost(requestedPostId);
    if(individualPost) {
        res.status(200).send(individualPost);
    } else {
        res.status(404).send(`There is no post with an ID of "${requestedPostId}". Please try another.`);
    }
    
});

// View all Posts
app.get('/api/posts', (req, res) => {
    res.status(200).send(postsData.get());
});







app.listen(8000, () => {
    console.log('Listening on http://localhost:8000');
});
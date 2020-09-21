const express = require("express");
const app = express();
const Post = require('./api/models/posts');
var multer  = require('multer');
const getExt = (mimeType) => {
    switch(mimeType) {
        case 'image/png':
            return '.png'
        case 'image/.jpeg':
            return '.jpeg'
        case 'image/.jpg':
            return '.jpg'
    }
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  });
var upload = multer({ storage: storage });
const postsData = new Post();

// Endpoints Start



// Parses Json data. Turns it into a JavaScript object we can use.
app.use(express.json());

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

// Post New Blog
app.post('/api/posts', upload.single('post-image'), (req, res) => {
    const newPost = {
        'id': `${Date.now()}`,
        'title': req.body.title,
        'content': req.body.content,
        'post_image': req.file.path,
        'added_date': `${Date.now()}`
    }
    postsData.add(newPost);
    res.status(201).send('okay');
});






app.listen(8000, () => {
    console.log('Listening on http://localhost:8000');
});
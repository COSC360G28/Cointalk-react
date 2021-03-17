import express from 'express';
import multer from 'multer';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const upload = multer({ dest: 'uploads/' });

// *** TEST ENDPOINTS ***

// Test to see that app is running
app.get('/test', (_, res) => {
    res.send('App is running...\n');
});

// Test to see what data is recieved from the application
app.post('/test', (req, res) => {
    // Create string to send back
    let response: string = 'App is running...\n';
    response += 'App recieved: \n';
    response += JSON.stringify(req.body, null, 2);

    // Return repsonse string to user
    res.send(response);
});

// *** GET ENDPOINTS ***

// Get Posts
app.get('/posts', (req, res) => {
    res.send('TODO');
});

// Get Comments
app.get('/comments', (req, res) => {
    res.send('TODO');
});

// Get Post
app.get('/post/:id', (req, res) => {
    // postID = req.params.id
    res.send('TODO');
});

// Get User
app.get('/user/:id', (req, res) => {
    // userID = req.params.id
    res.send('TODO');
});

// *** POST ENDPOINTS ***

// Login
app.post('/login', (req, res) => {
    res.send('TODO');
});

// Sign Up
app.post('/signup', upload.single('profile-image'), (req, res, next) => {
    console.log(req.file, req.body);
    res.send('TODO');
});

// Create Comment
app.post('/comment', (req, res) => {
    res.send('TODO');
});

// Create Post
app.post('/post', (req, res) => {
    res.send('TODO');
});

// Like Post
app.post('/like', (req, res) => {
    res.send('TODO');
});

// Request Password Reset
app.post('/reset-password', (req, res) => {
    res.send('todo');
});

// Ban User
app.post('/user/:id/ban', (req, res) => {
    // user = req.params.id
    res.send('todo');
});

// Remove Post
app.post('/post/:id/remove', (req, res) => {
    // post = req.params.id
    res.send('todo');
});

// Edit Post
app.post('/post/:id/edit', (req, res) => {
    // post = req.params.id
    res.send('todo');
});

export { app };

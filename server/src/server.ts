import express from 'express';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

export { app };

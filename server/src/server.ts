import express from 'express';
import { Connection } from './database';
import { upload } from './multer';
import { formatComments } from './functions';
import cors from 'cors';

const app = express();

// Middleware app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cors());

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

//Test to see if database connection is working
app.get('/test-database', async (_, res) => {
    var database = new Connection();
    try {
        await database.getConnection().query('');
        res.send('Successfully connected to database!');
    } catch (err) {
        res.send('Unable to connect to database!');
    } finally {
        database.disconnect();
    }
});

// *** GET ENDPOINTS ***

// Get Posts
app.get('/posts', (req, res) => {
    // Query Params
    const pageCount = 10;
    const page = (req.query.page || 0) as number;
    const sortBy = (req.query.sortBy || 'NEW') as string;

    // Create Connection to DB
    const db = new Connection();
    const conn = db.getConnection();

    // Return error if page is invalid
    if (page < 0) res.status(400).send('Error: Invalid page number.');

    if (sortBy.toUpperCase() === 'NEW') {
        // Return Posts by postdate
        conn.query(
            `SELECT * FROM post, account WHERE post.userid = account.uid ORDER BY date DESC LIMIT ${pageCount} OFFSET ${
                page * pageCount
            }`,
        )
            .then((result) => {
                db.disconnect();
                res.status(200).send(result.rows);
            })
            .catch((err) => {
                db.disconnect();
                res.status(500).send(err);
            });
    } else if (sortBy.toUpperCase() === 'HOT') {
        // Return Posts by score, then postdate
        conn.query(
            `SELECT * FROM post, account WHERE post.userid = account.uid ORDER BY score DESC, date DESC LIMIT ${pageCount} OFFSET ${
                page * pageCount
            }`,
        )
            .then((result) => {
                db.disconnect();
                res.status(200).send(result.rows);
            })
            .catch((err) => {
                db.disconnect();
                res.status(500).send(err);
            });
    } else {
        // Return error if sortBy is invalid
        res.status(400).send('Error: Invalid sort Method');
    }
});

// Get Comments
app.get('/posts/:id/comments', (req, res) => {
    const postID = req.params.id;

    // Return 400 if ID is not defined
    if (!postID) res.status(400).send('Error: No post ID given');

    // Create connection to DB
    const db = new Connection();
    const conn = db.getConnection();

    conn.query(
        `SELECT username, uid, content, parentID, cid FROM comment, account WHERE account.uid = comment.userID AND comment.mainPostID = ${postID}`,
    )
        .then((result) => {
            db.disconnect();
            let comments = formatComments(result.rows);
            res.status(200).send(comments);
        })
        .catch((err) => {
            db.disconnect();
            res.status(400).send(err);
        });
});

// Get Post
app.get('/post/:id', (req, res) => {
    const postID = req.params.id;

    // Return 400 if ID is not defined
    if (!postID) res.status(400).send('Error: No post ID given');

    // Create connection to DB
    const db = new Connection();
    const conn = db.getConnection();

    conn.query(`SELECT * FROM post, account WHERE pid = ${postID} and post.userID = uid`)
        .then((result) => {
            db.disconnect();
            // Return result with status 200
            res.status(200).send(result.rows[0]);
        })
        .catch((err) => {
            db.disconnect();
            // Return 400 if post was not found
            res.status(400).send(err);
        });
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

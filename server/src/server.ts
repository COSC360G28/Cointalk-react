import path from 'path';
import express from 'express';
import { Connection } from './database';
import { upload } from './multer';
import { formatComments } from './functions';
import cors from 'cors';

var session = require("express-session");
declare module 'express-session' {
    export interface SessionData {
      uid: number;
    }
  }

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(
    session({
        secret: "51egt56get546t651et61",
        saveUninitialized: false,
        resave: false,
    })
);

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

// Get image
app.get('/image/:id', (req, res) => {
    const filename = req.params.id;
    res.sendFile(path.resolve(`uploads/${filename}`));
});

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
app.get('/post/:id/comments', (req, res) => {
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
    var email = req.body.body.email;
    var password = req.body.body.password;

    const db = new Connection();
    const conn = db.getConnection();
    conn.query(
        `SELECT username, uid FROM account WHERE account.email = '${email}' AND account.password = '${password}' ORDER BY uid DESC LIMIT 1`,
    )
        .then((result) => {
            if(result.rows.length > 0) {
                //Example how to get query results
                let uid = result.rows[0].uid;
                req.session.uid = uid;
                res.status(200).send("Logged In.");
            } else {
                res.status(401).send("Bad Credentials.");
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        })
        .finally(() => {
            db.disconnect();
        });
});

// Sign Up
app.post('/signup', (req, res, next) => {

    const username = req.body.body.username;
    const email = req.body.body.email;
    const password = req.body.body.password;

    if(!username) {
        res.status(400).send({"field": "username", "message" : "is required."});
    } else if(!email) {
        res.status(400).send({"field": "email", "message" : "is required."});
    } else if(!password) {
        res.status(400).send({"field": "password", "message" : "is required."});
    } else if(username.length < 5) {
        res.status(400).send({"field": "username", "message" : "is too short. Must be at least 5 characters long."});
    } else if(username.length > 20) {
        res.status(400).send({"field": "username", "message" : "is too long. Must be less than 20 characters."});
    } else if(email.length < 5) {
        res.status(400).send({"field": "email", "message" : "is too short. Must be at least 5 characters long."});
    } else if(email.length > 50) {
        res.status(400).send({"field": "email", "message" : "is too long. Must be less than 50 characters."});
    } else if(password.length < 6) {
        res.status(400).send({"field": "password", "message" : "is too short. Must be at least 6 characters long."});
    } else if(password.length > 30) {
        res.status(400).send({"field": "password", "message" : "is too long. Must be less than 30 characters."});
    } else {
        const date = Math.round(Date.now() / 1000);
        const db = new Connection();
        const conn = db.getConnection();
        conn.query(
            `INSERT INTO account(username, password, email, dateCreated, admin) VALUES ('${username}', '${password}', '${email}', to_timestamp(${date}), FALSE)`,
        )
            .then((result) => {
                res.status(201).send("Account Created.");
            })
            .catch((err) => {
                res.status(409).send({"field": "secondPassword", "message": "An account already exists with this email or username"});
            })
            .finally(() => {
                db.disconnect();
            });
    }
});

//Check tell front end if the user is logged in
app.post('/check-auth-status', (req, res) => {
    if(req.session && req.session.uid) {
        res.status(200).send({"loggedIn" : "loggedIn"});
    } else {
        res.status(200).send({"loggedIn" : "loggedOut"});
    }
});

//Log out
app.post('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(function(err) {
            console.error(err);
        });
        res.status(200).send({"loggedIn" : "loggedIn"});
    }
});

//used to upload a profile picture for an account
app.post('/uploadProfileImage', upload.single('profile-image'), (req, res, next) => {
    res.send("TODO");
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

import path from 'path';
import express from 'express';
import { Connection } from './database';
import { upload } from './multer';
import { formatComments } from './functions';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

var session = require('express-session');
declare module 'express-session' {
    export interface SessionData {
        uid: number;
    }
}

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('trust proxy', 1);
app.use(cors({ credentials: true, origin: process.env.APP_BASE_URL }));
app.use(
    session({
        secret: '51egt56get546t651et61',
        saveUninitialized: true,
        resave: true,
        httpOnly: false,
        cookie: {
            secure: false,
            maxAge: 8 * 60 * 60 * 1000, // 8 hours
        },
    }),
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
    const category = (req.query.category || 'ETH') as string;
    const sortBy = (req.query.sortBy || 'NEW') as string;
    const searchText = req.query.searchText || null;

    // Create Connection to DB
    const db = new Connection();
    const conn = db.getConnection();

    // Return error if page is invalid
    if (page < 0) res.status(400).send('Error: Invalid page number.');

    // Return Posts by postdate
    conn.query(
        `SELECT * FROM post, account WHERE post.userID=account.uid AND post.coin='${category}' ${
            searchText
                ? `AND (post.title ILIKE '%${searchText}%' OR post.text ILIKE '%${searchText}%' OR account.email ILIKE '%${searchText}%' OR account.username ILIKE '%${searchText}%')`
                : ''
        } ORDER BY ${sortBy.toUpperCase() === 'NEW' ? '' : 'score DESC,'} date DESC LIMIT ${pageCount} OFFSET ${
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
    if (!postID){
        res.status(400).send('Error: No post ID given');
        return null;
    } 

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

// Gets the user based on UID
app.get('/user/:id', (req, res) => {
    const userID = req.params.id;
    // userID = req.params.id

        // Return 400 if ID is not defined
        if (!userID) {res.status(400).send('Error: No User ID given'); 
    return null;
    }
    // Create connection to DB
    const db = new Connection();
    const conn = db.getConnection();

    conn.query(`SELECT username, password FROM account WHERE uid = ${userID}`)
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

// Get Logged in User Account
app.get('/account', (req, res) => {
    if (req.session && req.session.uid) {
        const db = new Connection();
        const conn = db.getConnection();
        conn.query(`SELECT username, uid, email, admin, accountAvatarURL FROM account WHERE ${req.session.uid}=uid`)
            .then((result) => {
                res.status(200).send(result.rows[0]);
            })
            .catch((err) => {
                res.status(404).send('Error: User not found');
            })
            .finally(() => {
                db.disconnect();
            });
    } else {
        res.status(401).send('Error: Not logged in');
    }
});

// *** POST ENDPOINTS ***

// Login
app.post('/login', (req, res) => {

    var email = req.body.body.email;
    var password = req.body.body.password;

    const db = new Connection();
    const conn = db.getConnection();
    conn.query(
        `SELECT username, uid, email, admin, accountAvatarURL FROM account WHERE account.email = '${email}' AND account.password = '${password}' ORDER BY uid DESC LIMIT 1`,
    )
        .then((result) => {
            if (result.rows.length > 0) {
                //Example how to get query results
                const user = result.rows[0];
                req.session.uid = user.uid;
                req.session.save(() => {
                    res.status(200).send(user);
                });
            } else {
                res.status(401).send('Bad Credentials.');
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

    if (!username) {
        res.status(400).send({ field: 'username', message: 'is required.' });
    } else if (!email) {
        res.status(400).send({ field: 'email', message: 'is required.' });
    } else if (!password) {
        res.status(400).send({ field: 'password', message: 'is required.' });
    } else if (username.length < 5) {
        res.status(400).send({ field: 'username', message: 'is too short. Must be at least 5 characters long.' });
    } else if (username.length > 20) {
        res.status(400).send({ field: 'username', message: 'is too long. Must be less than 20 characters.' });
    } else if (email.length < 5) {
        res.status(400).send({ field: 'email', message: 'is too short. Must be at least 5 characters long.' });
    } else if (email.length > 50) {
        res.status(400).send({ field: 'email', message: 'is too long. Must be less than 50 characters.' });
    } else if (password.length < 6) {
        res.status(400).send({ field: 'password', message: 'is too short. Must be at least 6 characters long.' });
    } else if (password.length > 30) {
        res.status(400).send({ field: 'password', message: 'is too long. Must be less than 30 characters.' });
    } else {
        const date = Math.round(Date.now() / 1000);
        const db = new Connection();
        const conn = db.getConnection();
        conn.query(
            `INSERT INTO account(username, password, email, dateCreated, admin) VALUES ('${username}', '${password}', '${email}', to_timestamp(${date}), FALSE) RETURNING username, uid, email, admin, accountAvatarURL`,
        )
            .then((result) => {
                const user = result.rows[0];
                req.session.uid = user.uid;
                res.status(201).send(user);
            })
            .catch((err) => {
                res.status(409).send({
                    field: 'secondPassword',
                    message: 'An account already exists with this email or username',
                });
            })
            .finally(() => {
                db.disconnect();
            });
    }
});

//Check tell front end if the user is logged in
app.post('/check-auth-status', (req, res) => {
    if (req.session && req.session.uid) {
        res.status(200).send({ loggedIn: 'loggedIn' });
    } else {
        res.status(200).send({ loggedIn: 'loggedOut' });
    }
});

//Log out
app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).send({ loggedIn: 'loggedIn' });
            } else {
                res.status(200).send({ loggedIn: 'loggedIn' });
            }
        });
    }
});

//used to upload a profile picture for an account
app.post('/uploadProfileImage', upload.single('profile-image'), (req, res, next) => {
    res.send('TODO');
});

// Create Comment
app.post('/comment', (req, res) => {
    if (!req.session?.uid) {
        res.status(401).send({ error: 'Error: Must  be logged in for this operation.' });
    } else if (!req.body?.postID) {
        res.status(400).send({ error: 'Error: No postID given' });
    } else if (!req.body?.content) {
        res.status(400).send({ error: 'Error: No content given' });
    } else {
        const db = new Connection();
        const conn = db.getConnection();
        const date = new Date().toISOString();
        const parentID = req.body.parentID || null;
        const { postID, content } = req.body;
        const query = parentID
            ? `INSERT INTO comment(content, userID, score, date, mainPostID, parentID) VALUES ('${content}', ${req.session.uid}, 0, '${date}', ${postID}, ${parentID})`
            : `INSERT INTO comment(content, userID, score, date, mainPostID) VALUES ('${content}', ${req.session.uid}, 0, '${date}', ${postID})`;

        conn.query(query)
            .then(() => {
                res.status(200).send('Comment posted successfully');
            })
            .catch(() => {
                res.status(400).send("Error: Couldn't add comment to the database.");
            });
    }
});

// Create Post
app.post('/post', (req, res) => {
    
        const userId = req.session.uid;


        if (!req.session?.uid) {
            res.status(401).send({ error: 'Error: Must  be logged in for this operation.' });
        }

        const title = req.body.title;
        const date = new Date().toISOString();
        const type = req.body.type;
        const content = req.body.content;
        const image = "";
        const coin = req.body.coin;
        
        
        //If post is an image type or not TODO: Change to image URL
        const query = (type == "text")
        //If its a text post:
        ? `INSERT INTO post (title, userID, date, type, text, score, coin) VALUES('${title}', 2 , '${date}', '${type}', '${content}', 0 ,'${coin}')`
        : `INSERT INTO post (title, userID, date, type, image, score, coin) VALUES('${title}', ${userId}, '${date}', '${type}', '${image}', 0 ,'${coin}')`;
    
        // Create connection to DB
        const db = new Connection();
        var conn = db.getConnection();

            conn.query(query)
            .then((result) =>{
            res.status(200).send("Post added successfuly");

            }).catch((err) => {
                // Return 400 if post was not added
                res.status(400).send(err);
            })
            .finally(() =>{
                db.disconnect();
            });
        
        



});


// Like Post
app.post('/like', (req, res) => {


    const userId = req.session.uid; //Change to req.session.id
    const postId = req.body.pid; //Change to .body.pid 
    // Return 400 if ID is not defined
    if (!userId) {res.status(400).send('Error: No User ID given'); 
        return null;
    }


    // Create connection to DB
    const db = new Connection();
    var conn = db.getConnection();

    //Checks to see if the user liked the post already
    var query = `SELECT accountID, postID FROM postLiked WHERE postID = ${postId} AND accountID = ${userId}`; 

    conn.query(query)
        .then((result) => {

            //If the user has already liked the post, remove the row from table
            if(result.rows.length != 0){
                const db2 = new Connection();
                var conn2 = db2.getConnection();
                var q1 = `DELETE FROM postLiked WHERE postID = ${postId} AND accountID = ${userId}`;
                conn2.query(q1).then(() =>{
                    res.status(200).send({message: "Post unliked, removed from DB", isLiked: false});
                    updateLikeCount(postId);
                }).catch((err) => {
                    // Return 400 if post was not found
                    res.status(402).send(err);
                }).finally(() => {
                    db2.disconnect();
                });
            }else{
                //Else, add to the table
                const db2 = new Connection();
                var conn2 = db2.getConnection();
                var add = `INSERT INTO postLiked VALUES (${userId}, ${postId})`;
                conn2.query(add).then(()=>{
                    updateLikeCount(postId);
                    res.status(200).send({message: "User account liked the post. Liked added to the db", isLiked: true});
                }).catch((err) => {
                    // Return 400 if post was not found
                    res.status(401).send(err);
                }).finally(() => {
                    db2.disconnect();
                });
            }
        })
        .catch((err) => {
            // Return 400 if post was not found
            res.status(400).send(err);
        })
        .finally(() =>{
            db.disconnect();
        });
});

// Check to see if a user has already liked a post
app.post('/check-post-like', (req, res) => {
    if (req.session && req.session.uid) {
        const db = new Connection();
        const conn = db.getConnection();
        conn.query(
            `SELECT * FROM postLiked WHERE accountID=${req.session.uid} AND postID=${req.body.pid}`,
        )
            .then((result) => {
                if(result.rows.length == 0) {
                    res.status(200).send({ liked: "postedNotLiked" });
                } else {
                    res.status(200).send({ liked: "postedLiked" });
                }
            })
            .catch((err) => {
                res.status(400).send({
                    message: 'Unable to query database.',
                });
            })
            .finally(() => {
                db.disconnect();
            });
    } else {
        res.status(200).send({ liked: "postedNotLiked" });
    }
});

// Returns how many likes a post has
app.post('/post-like-count', (req, res) => {

    const db = new Connection();
    const conn = db.getConnection();
    conn.query(
        `SELECT * FROM postLiked WHERE postID=${req.body.pid}`,
    )
        .then((result) => {
            res.status(200).send({ numberOfLikes: result.rows.length });
        })
        .catch((err) => {
            res.status(400).send({
                message: 'Unable to query database.',
            });
        })
        .finally(() => {
            db.disconnect();
        });
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
    if (req.session && req.session.uid) {
        const post = req.params.id;
        const db = new Connection();
        const conn = db.getConnection();
        conn.query(
            `UPDATE post SET text='${req.body.newText}' WHERE pid=${post} AND userID=${req.session.uid}`,
        )
            .then((result) => {
                res.status(200).send("Post Updated");

            })
            .catch((err) => {
                res.status(400).send({
                    message: 'Unable to query database.',
                });
            })
            .finally(() => {
                db.disconnect();
            });
    } else {
        res.status(401).send("User must be logged in to edit posts");
    }
});

// Returns { isPostOwner: true } if the current user owns the post
app.post('/post/:id/isPostOwner', (req, res) => {
    if (req.session && req.session.uid) {
        const post = req.params.id;
        const db = new Connection();
        const conn = db.getConnection();
        conn.query(
            `SELECT * FROM post WHERE pid=${post} AND userID=${req.session.uid}`
        )
            .then((result) => {
                if(result.rows.length > 0) {
                    res.status(200).send({isPostOwner: true});
                } else {
                    res.status(200).send({isPostOwner: false});
                }
            })
            .catch((err) => {
                res.status(400).send({
                    message: 'Unable to query database.',
                });
            })
            .finally(() => {
                db.disconnect();
            });
    } else {
        res.status(200).send({isPostOwner: false});
    }
});

//After the postLiked Table is updated we retrieve the total number of likes to update the post table
function updateLikeCount(pid: number) {
    const db = new Connection();
    var conn = db.getConnection();
    conn.query(
        `SELECT * FROM postLiked WHERE postID=${pid}`
    )
        .then((result) => {
            //Update post table with the new number of likes
            var postNumberOfLikes = result.rows.length;
            const db2 = new Connection();
            var conn2 = db2.getConnection();
            conn2.query(
                `UPDATE post SET score=${postNumberOfLikes} WHERE pid=${pid}`
            )
                .then(() => {

                })
                .catch((err) => {
                    console.error(err);
                }).finally(() => {
                    db2.disconnect();
                });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            db.disconnect();
        });
}

export { app };

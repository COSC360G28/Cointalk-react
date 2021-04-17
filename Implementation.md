## COSC 360 - Detailed Implementation of Project


## Basic Overview & Programming Languages/Frameworks Used

Cointalk utilizes an array of modern frameworks and programming languages. Our front end application is built with React. 
This allows us to use components, which creates options for code reusability and easy implementation of common elements like headers, nav bars etc. 

The individual components make use of basic HTML syntax such as <div>, <a>, <p> while the design of those components use SCSS. SCSS is utilized to use advanced styling choices that CSS may not provide.
Docker is the container for the project which holds all the libraries and other depenedencies that are used to deploy the application. This allows us to keep the whole application local and deploy as one package.
 
 PostgreSQL is used to allow us to make complex queries and to store all data into our database.
 
 Node/Express is used for the logic and JavaScript of the project. This is used for the complex functions where we need variables and code to create robust data transfer and code manipulability.

## 1. Docker compose/images (I can do this later)

### Accessing parameters

- URL params

  To access parameters from the url (eg. getting id from `/post/id` where id is dynamic) we can write a request as follows:

  ```javascript
  app.get("/post/:id", (req, res) => {
    const id = req.params.id;
  });
  ```

- Querystring params

  To access parameters in the querystring (eg. getting sortBy from `/posts?sortBy=hot`)

  ```javascript
  app.get("/post", (req, res) => {
    const sortBy = req.query;
  });
  ```

- Body params

  To access paramaters from the body of a post request (eg. getting a parameter `id` from the body of the request)

  ```javascript
  app.post("/post", (req, res) => {
    const id = req.body.id;
  });
  ```

## 2. Express Routes
Express routes are used heavily throughout the project. A basic route could be:
```javascript
app.get('/testing/:id', (req, res) => {
    const postID = req.params.id;

    // Return 400 if ID is not defined
    if (postID == 1) { 
        res.status(200).send('Yay number 1');
    } else {
        res.status(400).send('Awe not number 1');
    }
});
```
This allows our project to continuely listen for HTTP requests and when it calls a request that matches one of the implemented routes, it is able to return or query the relative request. 

## 3. Connecting to postgres from node

To access the postgres database from node the 'pg' package was used. This package is designed for this specific type of connection.
A connection object was defined in database.ts which will manage the database connection. It had useful functions such as:
- connect()
- disconnect()
- getConnection()
- resetConnection()
- populate()
<br>
These can then be used in the backend endpoints. Using it in an endpoint would look something like this.
```javascript
import { Connection } from './database';

app.get('/test-database', (_, res) => {
    var database = new Connection();
    var connection = database.getConnection();
    connection.query('SELECT * FROM account')
        .then((result) => {
            res.status(200).send(result.rows);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
        .finally(() => {
            db.disconnect();
        });
});
```

## 4. Using multer for storing images to the uploads folder

The Node.js Multer library was used for image uploading. The implementation of multer can be found in multer.ts, though a snippet looks like:

```
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

```
Multer is the package that allows user to upload images to their profile, or to their post. From here, we can see the pictures will be stored in 'uploads' folder with their image being the relative path.


## 5. Axios for AJAX

Axios was used to handle the AJAX portion of our web application. A basic Axio implementation is:
```javascript
axios
  .post(
    `${process.env.REACT_APP_API_URL}/testing/${id}/`,
    {},
    { withCredentials: true }
  )
  .then((res) => {
    console.log(Success);
  })
  .catch((err) => {
    console.log(err);
  });
```
  Axios was used for the Asynchronous updating of the page, such as posting a new comment. Axios allows us to send HTTP requests to one of our endpoints and trigger that endpoint without the user having to refresh the page. The { withCredentials: true } allows for credentials stored in cookies to be passed through the http request.
<br>
Combining this with react's useEffect the application will listen to the current page and if an event is triggered, it will send a request to the relative endpoint which will trigger a change in the web structure. This can be seen below.
```javascript
useEffect(() => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/testing/${id}/`,
      {},
      { withCredentials: true }
    )
    .then((res) => {
      console.log(Success);
    })
    .catch((err) => {
      console.log(err);
    });
}, [ifThisVariableChangesUseEffectIsTriggered]);
```

## 6. React Router for frontend urls

To navigate the frontend urls React Router was used. Routes were created in App.js to render a react component that represents a page. Here is the code that routes the url:
```javascript
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={[user, setUser]}>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/post/:id" exact>
              <Post />
            </Route>
            <Route path="/user/:id" exact>
              <User />
            </Route>
            <Route path="/logout" exact>
              <Logout />
            </Route>
            <Route path="/newPost" exact>
              <NewPost />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
```

## 7. Sessions in express

User sessions are managed using the 'express-session' package. This package stores a cookie in the user's browser to keep track of a user's session. This package was set up as follows:
```javascript
var session = require('express-session');
declare module 'express-session' {
    export interface SessionData {
        uid: number;
    }
}
```
A session could then be created in this way:
```javascript
req.session.uid = theUsersID;
req.session.save(() => {
    res.status(200).send(user);
});
```
After this the users ID could be accessed through the session
```javascript
let userID = req.session.uid;
```

## 8. Recovery Email

The 'nodemailer' package was used to to send recovery emails. This allows package allows for creation of a Transport object with an emailing service provider (eg. gmail), a username, and a password.
```javascript
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@gmail.com',
    pass: 'testPass'
  }
});
```
This Transport object will then be able to login to that email account. Using the Transport object emails can be sent to the users emails in order to recover their account.
```javascript
var mailOptions = {
  from: 'test@gmail.com',
  to: 'targetEmail@something.com',
  subject: 'CoinTalk Password Recovery',
  text: 'Email content goes here'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log("Success!");
  }
});
```

## 9. SQL setup

The SQL Database uses many different tables to ensure that the data is stored in an intuitive and convienent way for access.

The account table holds all the data for a user's account. Unique ids per account, a username, password, email, overall score, a link to the avatar for the user if they uploaded one, and the time when the account was created are all stored for access on the website. There are also booleans for admin and banned, which would allow or not allow access to certain features on the website.

The coin table just holds the names and abbreviations of different coins. The main reason this is a different table instead of just a part of a different table is so that in the future it would be easy to add more or remove different coins. 

The post table keeps track of all the information for every post. Each post has an ID, a title, a date that it was created, Content for the post in the form of text and/or an image, the score that the post has gotten from stars, and the coin category that the post was put under. It also contains the user that put up the post with a reference key to the account table so that the data stays consistent. The Coin type referenses the coin table for the same reason.

The comment table holds all the expected information for every comment. The ID of the comment, the ID of the post that the comment is on, the comment text itself, the comment score, the date it was posted, and the id of the user that posted it are all in the table. It also has a parentID value, which is optional and would refer to the comment ID of another comment. This would be used when a comment is replying to another comment instead of just commenting to the main post itself. The userID referenses the account table and the mainPostID referenses the post table for keeping data consistent. The parentID referenses the commentID, which is a foreign key from the comment table to the comment table. This also just keeps data consistent and makes sure there are no bad data entries.

The last 2 tables are the postLiked and CommentLiked tables. These just hold the accountID and postID (or commentID) for the user and the post or comment that they starred. userID referenses the account table and postID/commentID reference the post table and comment table respectively. The reason that this information has to be held on a database is so that the website can know whether or not a user has already starred something regardless of what device the user is accessing the website on or where the user is accessing the website from.

## 10. TypeScipt

Typescript was used on the backend of the application because of the benefits that typing allows. JavaScript is a loosely typed language and TypeScript extends this to help reduce errors caused by developers. It was especially useful in this project because we were dealing with multiple packages and TypeScript helped to ensure we knew exactly what we were giving a package as well as what we were receiving from them. Here is an example of declaring a variable that will store a Client object.
```javascript
private client: Client;
```

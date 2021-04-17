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
  Axios was used for the Asynchronous updating of the page, such as posting a new comment. Axios allows us to send HTTP requests to one of our endpoints and trigger that endpoint without the user having to refresh the page.
Combining this with reacts useEffect the application will listen to the current page and if an event is triggered, it will send a request to the relative endpoint which will trigger a change in the web structure. This can be seen below.
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

## 7. Sessions in express

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

## 10. ...idk? Anything else we can cover?


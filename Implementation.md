## COSC 360 - Detailed Implementation of Project


## Basic Overview & Programming Languages/Frameworks Used

Cointalk utilizes an array of modern frameworks and programming languages. Our front end application is built with React. 
This allows us to use components, which creates options for code reusability and easy implementation of common elements like headers, nav bars etc. 
The individual components make use of basic HTML syntax such as <div>, <a>, <p> while the design of those components use SCSS.
SCSS is utilized to use advanced styling choices that CSS may not provide.

## 1. Docker compose/images (I can do this later)

## 2. Express routes

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

## 3. Connecting to postgres from node

## 4. Using multer for storing images to the uploads folder

## 5. Axios for AJAX

## 6. React Router for frontend urls

## 7. Sessions in express

## 8. Recovery Email

The 'nodemailer' package was used to to send recovery emails. This allows package allows for creation of a Transport object with an emailing service provider (eg. gmail), a username, and a password. This Transport object will then be able to login to that email account. Using the Transport object emails can be sent to the users emails in order to recover their account.

## 9. SQL setup

The SQL Database uses many different tables to ensure that the data is stored in an intuitive and convienent way for access.

The account table holds all the data for a user's account. Unique ids per account, a username, password, email, overall score, a link to the avatar for the user if they uploaded one, and the time when the account was created are all stored for access on the website. There are also booleans for admin and banned, which would allow or not allow access to certain features on the website.

The coin table just holds the names and abbreviations of different coins. The main reason this is a different table instead of just a part of a different table is so that in the future it would be easy to add more or remove different coins. 

The post table keeps track of all the information for every post. Each post has an ID, a title, a date that it was created, Content for the post in the form of text and/or an image, the score that the post has gotten from stars, and the coin category that the post was put under. It also contains the user that put up the post with a reference key to the account table so that the data stays consistent. The Coin type referenses the coin table for the same reason.

The comment table holds all the expected information for every comment. The ID of the comment, the ID of the post that the comment is on, the comment text itself, the comment score, the date it was posted, and the id of the user that posted it are all in the table. It also has a parentID value, which is optional and would refer to the comment ID of another comment. This would be used when a comment is replying to another comment instead of just commenting to the main post itself. The userID referenses the account table and the mainPostID referenses the post table for keeping data consistent. The parentID referenses the commentID, which is a foreign key from the comment table to the comment table. This also just keeps data consistent and makes sure there are no bad data entries.

The last 2 tables are the postLiked and CommentLiked tables. These just hold the accountID and postID (or commentID) for the user and the post or comment that they starred. userID referenses the account table and postID/commentID reference the post table and comment table respectively. The reason that this information has to be held on a database is so that the website can know whether or not a user has already starred something regardless of what device the user is accessing the website on or where the user is accessing the website from.

## 10. ...idk? Anything else we can cover?


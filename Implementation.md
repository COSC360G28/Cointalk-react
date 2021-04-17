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

## 10. ...idk? Anything else we can cover?


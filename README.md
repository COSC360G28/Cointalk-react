# Getting Started

## Requirements

- [Docker](https://www.docker.com/get-started)

## Setup Development evironment

### Using Docker Compose

`docker-compose up`

#### Issues with Docker Compose

Packages are installed at container build time so if you are having issues with docker compose not starting properly, run `npm run clean` to rebuild the docker containers

# Development

## Testing

- To run unit tests, enter the following in the `/server/` directory
  ```bash
    npm install
    npm run test
  ```
  This starts the pg docker container and runs tests against the API.
  After the tests have finished, the container is removed.

## Server

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

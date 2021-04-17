# Details of Project

All documents and deliverables linked [here](DOCS.md)

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

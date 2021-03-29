# Getting Started

## Requirements

- [Docker](https://www.docker.com/get-started)

## Setup Development evironment

### Using Docker Compose

`docker-compose up`

### Without Docker Compose

1. Start the Database
   - `docker run --name postgres-docker -e POSTGRES_PASSWORD=pg_pass -p 5432:5432 -d postgres`
2. Start the node server
   - `cd server`
   - `npm run dev`
3. Start the React Front-end (In a separate terminal)
   - `cd react-app`
   - `npm start`

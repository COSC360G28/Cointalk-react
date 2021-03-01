import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('App is running');
});

// Listen for requests on port 5000
app.listen('5000');

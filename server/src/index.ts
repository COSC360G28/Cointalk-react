import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('App is running');
});

// Listen for requests on port 3000
app.listen('3000');

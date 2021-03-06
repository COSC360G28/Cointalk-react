import express from 'express';

const app = express();

app.use(express.json());

// Test to see that app is running
app.get('/test', (req, res) => {
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

// Listen for requests on port 5000
app.listen('5000');

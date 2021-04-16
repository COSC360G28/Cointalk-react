import { app } from './server';
import { Connection } from './database';

if (process.env.NODE_ENV !== 'test') {
    // Set Default db data
    const db = new Connection();
    db.populate()
        .then((res) => {
            console.log('Data added to Database');
        })
        .catch((err) => {
            console.log(err);
            console.log('Error adding Data to Database');
        })
        .finally(() => {
            db.disconnect();
        });
}

// Listen for requests on port 5000
let server = app.listen(5000, () => {
    // @ts-ignore
    let port = server.address().port;
    console.log(`Server listening on port ${port}`);
});

module.exports = server;

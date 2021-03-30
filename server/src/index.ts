import { app } from './server';
import { Connection } from './database';

// Set Default db data
const db = new Connection();
db.populate();

// Listen for requests on port 5000
app.listen('5000');
console.log('Server listening on port 5000');

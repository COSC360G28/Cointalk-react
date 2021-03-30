import { Client } from 'pg';
import fs from 'fs';

export class Connection {
    private client: Client;

    constructor() {
        this.client = new Client({
            user: 'postgres',
            database: 'postgres',
            host: 'postgres',
            password: 'pg_pass',
            port: 5432,
            query_timeout: 10000,
        });
        this.connect();
    }

    connect() {
        this.client.connect((err) => {
            if (err) {
                console.error('connection error', err.stack);
            }
        });
    }
    disconnect() {
        this.client.end();
    }

    getConnection() {
        return this.client;
    }

    populate() {
        fs.readFile('Database.ddl', 'utf-8', (err, data) => {
            if (err) throw err;
            // console.log(data);
            this.client.query(data, (err) => {
                if (err) throw err;
            });
        });
    }
}

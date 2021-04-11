import { Client } from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export class Connection {
    private client: Client;

    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASS,
            port: parseInt(<string>process.env.DB_PORT, 10),
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
            this.client.query(data, (err) => {
                if (err) throw err;
            });
        });
    }
}

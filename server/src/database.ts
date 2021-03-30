import { Client } from 'pg';

export class Connection {

    private client: Client;

    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'pg_pass',
            port: 5432,
            query_timeout: 10000
        })
        this.connect();
    }

    connect() {
        this.client.connect(err => {
            if (err) {
                console.error('connection error', err.stack);
            }
        })
    }
    disconnect() {
        this.client.end()
    }

    getConnection() {
        return this.client;
    }
}
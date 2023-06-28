import express, { Express, Request, Response } from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { App } from './route';
import Database from './db';
class Server {
    public app: Express;
    public port: number;
    // public database: Database;

    constructor() {
        dotenv.config();
        this.app = express();
        this.port = Number(process.env.PORT);
        this.connectToDb();
        this.setupRoutes();
        this.start();
    }
    public async connectToDb() {
        let database = new Database();
        await database.connect();
    }
    public setupRoutes() {
        let app = new App()
        this.app.use(app.router);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}

let server = new Server();

import express, { Express, Request, Response } from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { App } from './route';
import Database from './db';
import path from 'path';
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
        // let app = new App()
        // // const apps = require('../public');
        // let dir = __dirname.replace('src', 'public');
        // this.app.use(express.static(path.join(dir, 'upload')));
        // this.app.use(app.router);
        const app = new App();
        const publicDir = path.join(__dirname, '..', 'public');
        this.app.use(express.static(path.join(publicDir, 'upload')));
        this.app.use(app.router);
    }


    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}

let server = new Server();
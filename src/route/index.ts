import express, { Express, Request, Response, Router } from 'express';
import AuthRoute from '../modules/Auth/AuthRoute';
import bodyParser from 'body-parser';
import HomeRoute from '../modules/other/homeRoute';
import ProductRouter from '../modules/Product/ProductRoute';

class App {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.startServer();
        // API routes can be defined here
    }

    startServer() {
        // instance's
        let homeRoute = new HomeRoute();
        let authModule = new AuthRoute();
        let productRouter = new ProductRouter
        this.router.use('/home', homeRoute.router);
        this.router.use('/auth', authModule.router);
        this.router.use('/product', productRouter.router);
    }
}

export { App };
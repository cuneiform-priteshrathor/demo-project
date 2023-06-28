import express, { Router } from 'express';
import HomeController from './homeController';
class HomeRoute {
    public router;

    constructor() {
        this.router = express.Router();
        this.allRoute();
    }
    /**
     * allRoute
     */
    public allRoute() {
        let homeController = new HomeController();
        this.router.get('/home', homeController.getData.bind(homeController));

    }
}
export default HomeRoute;

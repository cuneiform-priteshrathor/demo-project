import express, { Router } from 'express';
import AuthController from './AuthController';
import AuthValidation from './AuthValidation';
class AuthRoute {

    public router;

    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }
    public setupRoutes() {
        let authController = new AuthController;
        let authValidation = new AuthValidation;
        this.router.post('/signup', authValidation.validateSignupData, authController.signup);
        this.router.post('/login', authValidation.validateLoginData, authController.login);
    }
}

export default AuthRoute;

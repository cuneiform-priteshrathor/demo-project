import express, { Express, Request, Response, Router } from 'express';
class HomeController {
    // constructor() {
    //     console.log('homeController');
    // }
    public getData(req: Request, res: Response) {
        let data = this.getSum(21, 22);
        res.json({
            message: 'Welcome to the home page!',
            data: data,
            timestamp: new Date().toISOString()
        });
    }
    public getSum(x: number, y: number) {
        return x + y;
    }
}
export default HomeController;
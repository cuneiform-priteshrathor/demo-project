import express, { Router } from "express";
import ProductController from "./ProductController";
import multer from 'multer';
class ProductRouter {
    public router;
    public storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/upload')
        },

        filename: function (req, file, cb) {
            let extension = file.originalname.split('.').pop();
            cb(null, Date.now() + '.' + extension)
        }
    })
    public uploadImg = multer({ storage: this.storage });
    constructor() {
        this.router = express.Router();
        this.setUpRouter();
    }
    setUpRouter() {
        let productController = new ProductController();
        this.router.post('/add', this.uploadImg.single('demo'), productController.addProduct);
        this.router.get('/get/:id', productController.getProductId);
        this.router.post('/update/:id', this.uploadImg.single('demo'), productController.updateProduct);
        this.router.post('/delete/:id', productController.deleteProduct);
        this.router.get('/get', productController.getProduct);
    }
}
export default ProductRouter
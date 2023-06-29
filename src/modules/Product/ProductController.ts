import { Request, Response } from "express";
import ProductConstent from "./ProductConstent";
import productSchema from "./ProductModel";
import mongoose, { mongo } from "mongoose";

class ProductController {
    constructor() {
        console.log(`${process.env.ImgUrl}`);

    }
    addProduct = async (req: Request, res: Response) => {
        try {
            let data = req.body;
            data.fileName = `${process.env.ImgUrl}${req.file?.filename}`
            let productData = new productSchema(data);
            let productAdd = await productData.save();
            if (productAdd) {
                return res.status(201).json({ message: ProductConstent.message.productAdd, data: productAdd })
            }
        } catch (error) {
            throw error;
        }
    }
    updateProduct = async (req: Request, res: Response) => {
        let productData = req.body;
        productData.fileName = `${process.env.ImgUrl}${req.file?.filename}`
        let productFindQuery = {
            _id: req.params.id,
            isDeleted: false,
        }
        let option = {}
        let updateData = {
            $set: productData
        }
        let finalData = await productSchema.findOneAndUpdate(productFindQuery, updateData, option);
        if (finalData) {
            return res.status(201).json({ message: ProductConstent.message.productUpdate })
        } else {
            return res.status(404).json({ message: ProductConstent.message.issue });
        }
    }

    deleteProduct = async (req: Request, res: Response) => {

        let productFindQuery = {
            _id: req.params.id,
            isDeleted: false,
        }
        let option = {}
        let deleteData = {
            $set: { isDeleted: true }
        }
        let finalData = await productSchema.findOneAndUpdate(productFindQuery, deleteData, option);
        if (finalData) {
            return res.status(201).json({ message: ProductConstent.message.productDelete })
        } else {
            return res.status(404).json({ message: ProductConstent.message.issue });
        }
    }
    getProductId = async (req: Request, res: Response) => {
        let productId = new mongoose.Types.ObjectId(req.params.id);
        let query = {
            _id: productId,
            isDeleted: false
        }
        // let option = {};

        let mainQuery = [
            { $match: query },

        ];
        const data = await productSchema.aggregate(mainQuery);
        if (data) {
            return res.status(201).json({ message: ProductConstent.message.productGet, data: data });
        } else {
            return res.status(404).json({ message: ProductConstent.message.productNotFound });
        }
    }
    getProduct = async (req: Request, res: Response) => {
        let data = await productSchema.aggregate([
            { $match: { isDeleted: false } },
            { $sort: { createDate: -1 } },
        ]);
        if (data.length > 0) {
            return res.status(201).json({ message: ProductConstent.message.productGet, data: data });
        } else {
            return res.status(404).json({ message: ProductConstent.message.productNotFound });
        }

    }
}
export default ProductController;
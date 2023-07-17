import { Request, Response } from "express";
import ProductConstent from "./ProductConstent";
import productSchema from "./ProductModel";
import mongoose from "mongoose";

class ProductController {

    addProduct = async (req: Request, res: Response) => {
        try {
            let data = req.body;
            data.fileName = `${process.env.ImgUrl}${req.file?.filename}`;
            let productData = new productSchema(data);
            let productAdd = await productData.save();
            if (productAdd) {
                let query = { _id: productAdd._id };
                let option = {
                    projection: { name: 1, price: 1, type: 1 }
                }
                let projectedData = await productSchema.findOne(query, option);
                return res.status(201).json({ message: ProductConstent.message.productAdd, data: projectedData })
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
        let option = {
            new: true,
            projection: {
                __v: 0
            }
        }
        let updateData = {
            $set: productData
        }
        let finalData = await productSchema.findOneAndUpdate(productFindQuery, updateData, option);
        if (finalData) {
            return res.status(201).json({ message: ProductConstent.message.productUpdate, data: finalData });
        } else {
            return res.status(404).json({ message: ProductConstent.message.issue });
        }
    }


    deleteProduct = async (req: Request, res: Response) => {

        let productFindQuery = {
            _id: req.params.id,
            isDeleted: false,
        }
        let option = {
            new: true,
            projection: {
                // name: 0
            }
        }
        let deleteData = {
            $set: { isDeleted: true }
        }
        let finalData = await productSchema.findOneAndUpdate(productFindQuery, deleteData, option);
        if (finalData) {
            return res.status(201).json({ message: ProductConstent.message.productDelete, finalData })
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
        let mainQuery: any = [
            { $match: query },
            {
                $project: {
                    __v: 0
                }
            },
            { $sort: { createDate: -1 } }

        ];
        let data = await productSchema.aggregate(mainQuery);
        if (data) {
            return res.status(201).json({ message: ProductConstent.message.productGet, data: data });
        } else {
            return res.status(404).json({ message: ProductConstent.message.productNotFound });
        }
    }
    getProduct = async (req: Request, res: Response) => {
        let query = {
            isDeleted: false,
        };
        let mainQuery: any = [
            { $match: query },
            {
                $project: {
                    __v: 0,
                }
            },
            { $sort: { createDate: -1 } }
        ];
        let data = await productSchema.aggregate(mainQuery);
        if (data.length > 0) {
            return res.status(201).json({ message: ProductConstent.message.productGet, data: data });
        } else {
            return res.status(404).json({ message: ProductConstent.message.productNotFound });
        }

    }
}
export default ProductController;
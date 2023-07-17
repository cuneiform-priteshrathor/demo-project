import { Request, Response, NextFunction } from 'express';
import ProductConstent from './ProductConstent';
import Joi from 'joi';
class ProductValidation {
    // constructor() {
    //     console.log('hello');
    // }
    public validationProduct(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'any.required': ProductConstent.message.nameInvalid
            }),
            price: Joi.number().min(0).required().messages({
                'number.min': ProductConstent.message.priceOne,
                'any.required': ProductConstent.message.priceTwo
            })
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map((detail) => {
                const fieldName = detail.context?.label || detail.context?.key || '';
                const message = detail.message.replace(/["']/g, ''); // Remove quotation marks from the error message
                return `${fieldName}: ${message}`;
            });
            return res.status(400).json({ errors: errorMessage });
        }

        next();
    }

}
export default ProductValidation;
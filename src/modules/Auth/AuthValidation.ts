
import { Request, Response, NextFunction } from 'express';
import AuthConstent from './AuthConstent';
import Joi from 'joi';
class AuthValidation {


    public validateSignupData(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': AuthConstent.message.invalidEmail,
                'any.required': AuthConstent.message.emailRequire
            }),
            password: Joi.string().required().messages({
                'any.required': AuthConstent.message.passwordRequire
            })
        });

        const { error } = schema.validate(req.body);

        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        }

        next();
    }


    public validateLoginData(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': AuthConstent.message.invalidEmail,
                'any.required': AuthConstent.message.emailRequire
            }),
            password: Joi.string().required().messages({
                'any.required': AuthConstent.message.passwordRequire
            })
        });

        const { error } = schema.validate(req.body);

        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        }

        next();
    }
}
export default AuthValidation
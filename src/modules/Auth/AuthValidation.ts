
import { Request, Response, NextFunction } from 'express';
import AuthConstent from './AuthConstent';
class AuthValidation {


    public validateSignupData(req: Request, res: Response, next: NextFunction) {

        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ error: AuthConstent.message.emailRequire });
        }
        if (!password) {
            return res.status(400).json({ error: AuthConstent.message.passwordRequire });

        }
        next();
    }


    public validateLoginData(req: Request, res: Response, next: NextFunction) {

        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ error: AuthConstent.message.emailRequire });
        }
        if (!password) {
            return res.status(400).json({ error: AuthConstent.message.passwordRequire });

        }

        next();
    }
}
export default AuthValidation
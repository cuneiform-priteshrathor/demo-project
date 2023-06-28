import { Request, Response } from 'express';
import userSchema from './AuthModel';
import bcrypt from 'bcrypt';
import AuthConstent from './AuthConstent';

class AuthController {

    signup = async (req: Request, res: Response) => {
        try {
            let { email, password } = (req.body);

            let existingUser = await userSchema.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ error: AuthConstent.message.emailAllReady });
            }

            let hashedPassword = await bcrypt.hash(password, 10);

            let newUser = new userSchema({
                email,
                password: hashedPassword,
            });
            let userLogin = await newUser.save();
            if (userLogin) {
                return res.status(201).json({ message: AuthConstent.message.signup });
            }
        } catch (error) {
            throw error;
        }
    };
    /**
     * login
     */
    login = async (req: Request, res: Response) => {
        try {
            let { email, password } = req.body;

            let existingUser = await userSchema.findOne({ email });

            if (!existingUser) {
                // User not found
                return res.status(404).json({ message: AuthConstent.message.userNotFound });
            }

            let isPasswordValid = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: AuthConstent.message.InvalidPassword });
            }
            else {
                return res.status(200).json({ message: AuthConstent.message.login });
            }
        } catch (error) {
            return res.status(500).json({ message: AuthConstent.message.internalError });
        }
    };

}
export default AuthController;
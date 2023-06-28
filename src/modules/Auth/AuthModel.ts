import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema
// interface IUser extends Document {
//     email: string;
//     password: string;
// }

let userSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Create and export the user model
export default mongoose.model('User', userSchema);
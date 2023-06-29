import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema
// interface IUser extends Document {
//     email: string;
//     password: string;
// }

let userSchema: Schema = new Schema({
    email: { type: String },
    password: { type: String },
});

export default mongoose.model('User', userSchema);
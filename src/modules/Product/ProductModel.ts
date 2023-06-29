import mongoose, { Schema, Document } from 'mongoose';
let productSchema: Schema = new Schema({
    name: { type: String },
    type: { type: String },
    price: { type: String },
    fileName: { type: String },
    isDeleted: { type: Boolean, default: false },
    createDate: { type: Date, default: new Date() }
});

export default mongoose.model('Product', productSchema);
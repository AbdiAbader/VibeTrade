
import mongoose, { Document, Model, Schema } from 'mongoose';




//


const productDocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be greater than or equal to 0"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than or equal to 0"]
    },

    image: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: ""
    },
    sale: {
        type: Boolean,
        default: false
    },
    brand: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
});

// export the product model.
export default mongoose.model("Product", productDocumentSchema);

import mongoose, { Document, Model, Schema } from 'mongoose';

interface ProductAttributes {
  color: string;
  size?: number;
  weight?: number;
  height?: number;
  width?: number;
}



export interface ProductDocument extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
  attributes: ProductAttributes;
  image: string;
  category: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}
interface ProductModel extends Model<ProductDocument> {}
const attributeschema = new mongoose.Schema<ProductAttributes>({
    color: {
        type: String,
        default: ""
    },
    size: {
        type: Number
        
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    width: {
        type: Number
    }
});

const productDocumentSchema = new mongoose.Schema<ProductDocument>({
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
    attributes: {
        type: attributeschema,
        default: {}
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: ""
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
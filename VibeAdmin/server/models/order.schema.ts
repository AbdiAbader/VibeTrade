import mongoose from "mongoose";

const order_itemschema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be greater than or equal to 1"]
    }
  });

const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
       
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    order_status: {
        type: String,
        default: "Pending"
    },
    payment_method: {
        type: String,
        default: "Cash on delivery"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    order_items: [order_itemschema] 
    });



// export the user model.

export default mongoose.model("Order", orderSchema);
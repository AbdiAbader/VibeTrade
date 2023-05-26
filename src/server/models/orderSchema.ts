import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
  product: {
    type: String,
    required: [true, "Product is required"]
  },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    }
});

// Apply the uniqueValidator plugin to userSchema.
orderSchema.plugin(uniqueValidator);

// export the user model.

export default mongoose.model("Order", orderSchema);
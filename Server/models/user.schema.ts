import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userDocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
    },
  pin: {
    type: Number,
    default: 0
    },
  verified: {
    type: Boolean,
    default: false
    },
    shippingAddress: {
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
    }

});
// Apply the uniqueValidator plugin to userSchema.
userDocumentSchema.plugin(uniqueValidator);

// export the user model.
export default mongoose.model("User", userDocumentSchema);


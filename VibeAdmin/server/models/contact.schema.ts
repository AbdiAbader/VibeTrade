import mongoose from "mongoose";

const contactus= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    });


export default mongoose.model("contactus", contactus);

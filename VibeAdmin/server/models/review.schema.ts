import { MinKey } from "mongodb";
import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: {
        type: String,
        required: true,
    }
});

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5

    },
    helpfulness: {
        type: Number,
        required: true,
        min: 0,
        max: 2000,
        default: 0
    },
    image: {
        type: String
    },
    title: {
        type: String,
        required: true,
        default: "Review Title"
    },
    content: {
        type: String,
        required: true,
        default: "Review Content"
    },
    comments: {
        type: [commentsSchema],
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updateAt: {
        type: Date,
        default: Date.now,
        required: true
    }
    });




export default mongoose.model("Review", reviewSchema);
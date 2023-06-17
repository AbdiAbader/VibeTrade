
import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}
);
const dislikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}
);
const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        default: "Reply Content"
    },
    likes: {
        type: [likeSchema],
        default: []
    },
    dislikes: {
        type: [dislikeSchema],
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
  
    content: {
        type: String,
        required: true,
        default: "Review Content"
    },
    likes: {
        type: [likeSchema],
        default: []
    },
   dislikes: {
        type: [dislikeSchema],
        default: []
    },
   
  replies: {
        type: [replySchema],
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
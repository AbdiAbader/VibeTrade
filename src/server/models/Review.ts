import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    comment : {
        type : String
    },
    rating : {
        type : Number,
        
        min : 1,
        max : 5,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    updatedAt : {
        type : Date,
        default : Date.now,
    }

});

export default mongoose.model("Review", reviewSchema);

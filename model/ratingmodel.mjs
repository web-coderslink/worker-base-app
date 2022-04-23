import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        rateing:{
            type:Number
        },
        CreatedBy:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "please provide user"],
        }
    }
);

const ratingmodel = mongoose.model('ratingjob',ratingSchema);
export default ratingmodel;
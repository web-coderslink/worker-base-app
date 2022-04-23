import ratingmodel from '../model/ratingmodel.mjs';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';



const createRating = async (req,res)=>{
    const {rating}= req.body;
    req.body.CreatedBy = req.user.id;
    const Rating = await ratingmodel.create(req.body);
    console.log(Rating);
    res.status(StatusCodes.OK).json({Rating})
}

const getAllRating = async (req, res) => {
    const rateings = await ratingmodel.find({});
    res.status(StatusCodes.OK).json({
           rateings,
           numOfRatings: rateings.length,
        });
}

export {createRating,getAllRating}
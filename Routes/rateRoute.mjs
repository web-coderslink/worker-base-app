import express from 'express';
import {createRating,getAllRating} from './../controller/ratingController.mjs'
import auth from './../utils/auth.mjs';

const router = express.Router();


router.route('/rate').post(createRating);
router.route('/allrate').get(getAllRating)

export default router;
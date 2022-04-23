import { rateLimit } from 'express-rate-limit';
import express from 'express';
import { register, login, updateUser } from './../controller/authcontroller.mjs'
import auth from './../utils/auth.mjs';

const apiLimiter=rateLimit({
    windowMs:10 * 60 * 1000,
    max:10,
    message:'too many requestsf from this IP address,please try again after 10 min'
})

const router = express.Router();

router.route('/reg').post(apiLimiter,register);
router.route('/allreg').get(register);
router.route('/login').post(apiLimiter,login);
router.route('/update').patch(auth, updateUser);

export default router;

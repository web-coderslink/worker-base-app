import { StatusCodes } from 'http-status-codes';
import 'http-status-codes'
import Userdetails  from '../model/usermodel.mjs';
import BadRequestError from '../errors/badrequest.mjs';
import AuthenticationError  from '../errors/authenticationerror.mjs';
//const customapi = require("./customapi");
//const notfound = require("./notfound");



console.log('im here');
const register = async (req, res) => {
   const { name, email, password } = req.body;
   console.log(name, email);

   if (!name || !email || !password) {
      throw new BadRequestError('please provide all values customAPI');
   }

   const userAlreadyExists = await Userdetails.findOne({ email });
   if (userAlreadyExists) {
      throw new AuthenticationError('ID already exists');
   }


   const user = await Userdetails.create({ name, email, password });
   console.log(user);
   const token = user.createJWT();

   res.status(StatusCodes.OK).json({
      result: {
         name: user.name,
         lastName: user.lastName,
         location: user.location,
         email: user.email,
      },
      token: token,
      location: user.location,
   });
};

const login = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         throw new BadRequestError('provode all value');
      }
      const user = await Userdetails.findOne({ email }).select('+password');
      // if (!user) {
      //    throw new AuthenticationError('Invalid Credentials');
      // }

      const isPasswordCorrect = await user.comaprepassword (password);
      if (!isPasswordCorrect) {
        throw new AuthenticationError("Invalid Credentials");
      }

      const token = user.createJWT()
        user.password = undefined //hidding it in the output
      res.status(StatusCodes.OK).json({ result: 'logged in',user,token,location:user.location });
   } catch (error) {
      //  res.status(500).json({mg:'error'})
      console.log(error);
      next(error);
   }
};

const updateUser = async (req, res) => {
   console.log("requested body    :",req.body);
  
   const { email, name, lastName, location } = req.body;
 
   if (!email || !name || !lastName || !location) {
      throw new Error('Please provide all values');
   }
   const user = await Userdetails.findOne({ _id: req.user.id});
   console.log("updsted user   :",user);
   user.email = email;
   user.name = name;
   user.lastName = lastName;
   user.location = location;

   await user.save();
   const token=user.createJWT()
   res.status(StatusCodes.OK).json({
      user,token,location:user.location
   })
};
export  { register, login, updateUser };

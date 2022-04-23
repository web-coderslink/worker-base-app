import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";


const userschema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'please provide name'],
      maxlength: 20,
      minlength: 2,
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'please provide email'],
      unique: true,
      validate: {
         validator: validator.isEmail,
         message: 'please provide a valid email address',
      },
   },
   password: {
      type: String,
      required: [true, 'pleasse provide password'],
      minlength: 8,
      select: false,
   },
   lastName: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'lastName',
   },
   location: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'my city name',
   },
});

userschema.pre('save', async function () {
   console.log(this.modifiedPaths());
   //by this way we can update the rest of data but not password
   if (!this.isModified('password')) return 
      console.log('update other details');
      const salt = await bcrypt.genSalt(10); // generating salt
      this.password = await bcrypt.hash(this.password, salt);
      console.log('userSchema password :', this.password);
   
});
console.log(process.env.JWT_SECRET);
userschema.methods.createJWT = function () {
   // return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
   //    expiresIn: process.env.JWT_EXP,

   return Jwt.sign({ id: this._id },process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
   });
};

userschema.methods.comaprepassword = async function (Userpassword) {
   const isMatch = await bcrypt.compare(Userpassword, this.password);
   return isMatch;
};
const Userdetails = mongoose.model('userjob', userschema);
 export default Userdetails;

import AuthenticationError from '../errors/authenticationerror.mjs';
import  Jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
   const headers = req.headers;
   const authHeader = req.headers.authorization;
   console.log('aunthenticating user:', headers, authHeader);

   //   if(!authHeader){
   //       throw new AuthenticationError('aunthentication invalid')
   //   }      // basic check for error

   if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new AuthenticationError('aunthentication invalid');
   }

   const token = authHeader.split(' ')[1];

   try {
      const payload = Jwt.verify(token, process.env.JWT_SECRET);
      console.log('payload  :', payload);
      req.user = {id:payload.id} // as mentioned in job model
      next();
   } catch (error) {
      console.log(error);
      throw new AuthenticationError('aunthentication invalid');
   }
};
export default auth;

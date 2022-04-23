import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customapi.mjs";
class AuthenticationError extends CustomAPIError{
    constructor(msg){
      super(msg)
      this.StatusCode= StatusCodes.UNAUTHORIZED;
  }}

  export default AuthenticationError;
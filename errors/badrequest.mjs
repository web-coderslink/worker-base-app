import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customapi.mjs";
class BadRequestError extends CustomAPIError{
    constructor(msg){
      super(msg)
      this.StatusCode= StatusCodes.BAD_REQUEST;
  }}

export default BadRequestError;
  
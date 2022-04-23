import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customapi.mjs";
class NotFoundError extends CustomAPIError{
    constructor(msg){
      super(msg)
      this.StatusCode= StatusCodes.NOT_FOUND;
  }}

  export default NotFoundError;
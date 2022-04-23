import  { StatusCodes }  from "http-status-codes";
import "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong with server,try again later",
  };
  console.log(err.name);
  console.log("errorr blog");

  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)}feild has t be unique`;
  }

  res.status(defaultError.statusCode).json({
    msg: defaultError.msg,
  });
};

export default errorHandlerMiddleware;

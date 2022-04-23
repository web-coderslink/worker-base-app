import express from "express";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import "express-async-errors";
import connectdb from "./db/connection.mjs";
import notfound from "./utils/not-found.mjs";
import errorHandlerMiddleware from "./utils/error-handler.mjs";
import authrouter from "./Routes/authroute.mjs";
import jobrouter from "./Routes/jobsrouter.mjs";
import rateRoute from "./Routes/rateRoute.mjs";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import auth from "./utils/auth.mjs";
import morgan from "morgan";

//const bodyParser from"body-parser");

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/jobs", auth, jobrouter);
app.use("/api/v1/rateUser", auth, rateRoute);

const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(_dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "./client/build", "index.html"));
});
//middleware
app.use(errorHandlerMiddleware);
app.use(notfound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log(process.env.JWT_EXP);
    await connectdb(process.env.ATLAS_URI, { useNewUrlParser: true });

    app.listen(port, () => {
      console.log("server running and mongodb connected", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);


const jobmodel = mongoose.model('Jobcollection',jobSchema);
 export default jobmodel;
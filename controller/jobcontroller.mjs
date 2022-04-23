import jobmodel from '../model/jobmodel.mjs';
import mongoose from 'mongoose';
import BadRequestError from '../errors/badrequest.mjs';
import AuthenticationError from '../errors/authenticationerror.mjs';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/notfound.mjs';
import checkPermissions from '../utils/checkpermission.mjs';
import moment from 'moment';
import notFoundMiddleWare from '../utils/not-found.mjs';


const createJob = async (req, res) => {
   console.log(req.body);
   const { position, company } = req.body;

   if (!position || !company) {
      throw new BadRequestError('company and position are to be mentioned');
   }
   req.body.createdBy = req.user.id;
   const job = await jobmodel.create(req.body);
   console.log(job);
   res.status(StatusCodes.CREATED).json({ job });
};

const deletejob = async (req, res) => {
   const { id: jobid } = req.params;
   const deljob = await jobmodel.findOne({ _id: jobid });
   if (!deljob) {
      throw new NotFoundError(`No job with id  :${jobid}`);
   }

   checkPermissions(req.user, deljob.createdBy);
   await deljob.remove();
   res.status(StatusCodes.OK).json({ msg: 'success!job removed' });
};

const getAlljob = async (req, res) => {
   const { status, jobType, sort, search } = req.query;

   //juz to get all jobs
   // const jobs = await Jobs.find({ createdBy: req.user.id });
   // res.status(StatusCodes.OK).json({
   //    jobs,
   //    totalJobs: jobs.length,
   //    numOfPages: 1,
   // });

   const queryObject = {
      createdBy: req.user.id,
   };

   if (status && status !== 'all') {
      queryObject.status = status;
   }
   if (jobType && jobType !== 'all') {
      queryObject.jobType = jobType;
   }
   if (search) {
      queryObject.position = { $regex: search, $options: 'i' };

     }  // NO AWAIT

      let result = jobmodel.find(queryObject);

      // chain sort conditions

       if (sort === 'latest') {
         result = result.sort('-createdAt')
       }
       if (sort === 'oldest') {
         result = result.sort('createdAt')
       }
       if (sort === 'a-z') {
         result = result.sort('position')
       }
       if (sort === 'z-a') {
         result = result.sort('-position')
       }

      

      //setup pagination
       const page = Number(req.query.page) || 1
       const limit = Number(req.query.limit) || 20
       const skip = (page - 1) * limit

      result = result.skip(skip).limit(limit)

      const jobs = await result;

       const totalJobs = await jobmodel.countDocuments(queryObject)
       console.log(totalJobs);
       const numOfPages = Math.ceil(totalJobs / limit)

      res.status(StatusCodes.OK).json({ jobs,totalJobs,numOfPages });
   
};

const updatejob = async (req, res) => {
   const { id: jobid } = req.params;
   const { company, position, jobLocation } = req.body;
   if (!position || !company) {
      throw new BadRequestError('please provide all required values');
   }

   const job = await jobmodel.findOne({ _id: jobid });

   if (!job) {
      throw new NotFoundError('No id matches');
   }

   //check permissions
   const updatejob = await jobmodel.findOneAndUpdate({ _id: jobid }, req.body, {
      new: true,
      runValidators: true,
   }); // this wont trigger hook in job scehma

   //alternative approach
   // job.position = position;
   // job.company= company;
   // job.jobLocation=jobLocation;

   await job.save();

   checkPermissions(req.user, job.createdBy);

   res.status(StatusCodes.OK).json({
      updatejob,
   });
};

const showStats = async (req, res) => {
   let stats = await jobmodel.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
      {
         $group: { _id: '$status', count: { $sum: 1 } },
      },
   ]);

   stats = stats.reduce((a, b) => {
      const { _id: title, count } = b;
      a[title] = count;
      return a;
   }, {});

   console.log(stats);

   const defultstats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
   };
   console.log(defultstats);
   let monthlyApplications = await jobmodel.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
      {
         $group: {
            _id: {
               year: {
                  $year: '$createdAt',
               },
               month: {
                  $month: '$createdAt',
               },
            },
            count: { $sum: 1 },
         },
      },
      {
         $sort: { '_id.year': -1, '_id.month': -1 },
      },
      { $limit: 6 },
   ]);

   monthlyApplications = monthlyApplications
      .map((item) => {
         const {
            _id: { year, month },
            count,
         } = item;
         const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM Y');
         return { date, count };
      })
      .reverse();

   res.status(StatusCodes.OK).json({ defultstats, monthlyApplications });
};
export  { createJob, deletejob, getAlljob, updatejob, showStats };

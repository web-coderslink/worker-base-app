import express from 'express';
import { createJob, deletejob, getAlljob, updatejob, showStats } from './../controller/jobcontroller.mjs'
import auth from './../utils/auth.mjs';

const router = express.Router();

router.route('/createjob').post(createJob);
router.route('/deletejob/:id').delete(deletejob);
router.route('/getall').get(getAlljob);
router.route('/updatejob/:id').patch(updatejob);
router.route('/analyse').get(showStats);

export default router;

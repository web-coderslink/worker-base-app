import classes from './../dashboard/viewjob.module.css';
import React from 'react';
import moment from 'moment';
import { useAppContext } from '../context/appcontext';
import { Link } from 'react-router-dom';
const JobContainer = ({
   _id,
   company,
   createdAt,
   position,
   status,
   jobType,
   jobLocation,
}) => {
   const { setEditJob, deleteJob } = useAppContext();

   // useEffect(()=>{
   //    getJobs()
   // })

   let date = moment(createdAt);
   date = date.format('MMM Do,YYYY');
   return (
      <div className={classes.jobs}>
         <article className={classes.title}>
            <span className={classes.icon}>{company[0]}</span>
            <div style={{ width: '100%' }}>
               <div title="position">{position}</div>

               <div title="company">{company}</div>
            </div>
         </article>
         <article className={classes.brief}>
            <div className={classes.part1}>
               <div
                  style={{
                     display: 'flex',
                     width: '100%',
                     alignItems: 'center',
                  }}
               >
                  {' '}
                  <span style={{ width: '40%' }}>Joblocation :</span>{' '}
                  <div>{jobLocation}</div>
               </div>
               <br></br>
               <div
                  style={{
                     display: 'flex',
                     width: '100%',
                     alignItems: 'center',
                  }}
               >
                  <span style={{ width: '40%' }}>Job Type :</span>
                  <div title={jobType}>{jobType}</div>
               </div>
               <br></br>
               <div
                  className={classes.buttonbox}
                  style={{ display: 'flex', width: '100%' }}
               >
                  <Link to="/dashboard/createjob">
                     <button
                        className={classes.editbtn}
                        onClick={() => {
                           setEditJob(_id);
                        }}
                     >
                        edit
                     </button>
                  </Link>
                  <button
                     className={classes.delbtn}
                     onClick={() => {
                        deleteJob(_id);
                     }}
                  >
                     Delete
                  </button>
               </div>
            </div>

            <div className={classes.part2}>
               <div style={{ display: 'flex', width: '100%' }}>
                  {' '}
                  <span style={{ width: '30%' }}>date :</span> <div>{date}</div>
               </div>
               <br></br>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div title={status} className={classes.statbox}>
                     {status}
                  </div>
               </div>
            </div>
         </article>
      </div>
   );
};

export default JobContainer;

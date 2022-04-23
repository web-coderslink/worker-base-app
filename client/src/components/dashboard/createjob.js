
import React from "react";
import classes from './createjob.module.css';
import FRcreate from '../UI/FRcreate';
import { useAppContext } from '../context/appcontext';
import Alert from '../UI/Alert';

export default function Createjob() {
   const {
      isLoading,
      displayAlert,
      showAlert,
      position,
      company,
      jobLocation,
      jobType,
      jobTypeOptions,
      status,
      statusOptions,
      isEditing,
      HandleChange,
      clearValues,
      createjob,
      editjob,
   } = useAppContext();

   /*
 usual fetch data setup
 const  fetchData= async()=>{
        const response = await  fetch('http://localhost:5000/')
        const data = await response.json()
        console.log(data);
    }

    useEffect(()=>{
        fetchData()
    },[]);
    */

   function onchangeHandler(e) {
      let name = e.target.name;
      let value = e.target.value;
      HandleChange({ name, value });
   }

   function onsubmitHandler(e) {
      e.preventDefault();
  
      if (!position || !company || !jobLocation) {
         displayAlert();
         return;
      }
      if (isEditing) {
         editjob()
         return;
      }
      createjob();
   }

   return (
      <section className={classes.createjob}>
         <form onSubmit={onsubmitHandler}>
            <div className={classes.titleCont}><h3>{isEditing ? 'edit job' : 'create job'}</h3>
            </div>
            {showAlert && <Alert />}
          

            <div className={classes.rowjob}>
               <FRcreate
                  type="text"
                  value={company}
                  name="company"
                  onChange={onchangeHandler}
               />
               <div className={classes.Select}>
                  <label>Jobtypes </label>
                  <select
                     name="jobTypes"
                     value={jobType}
                     onChange={onchangeHandler}
                  >
                     {jobTypeOptions.map((value, i) => {
                        return (
                           <option key={i} value={value}>
                              {value}
                           </option>
                        );
                     })}
                  </select>
               </div>

               <FRcreate
                  type="text"
                  value={position}
                  name="position"
                  onChange={onchangeHandler}
               />
            </div>
            <div className={classes.rowjob}>
               <FRcreate
                  type="text"
                  value={jobLocation}
                  name="jobLocation"
                  onChange={onchangeHandler}
               />
               <div className={classes.Select}>
                  <label>Status </label>
                  <select
                     value={status}
                     name="status"
                     onChange={onchangeHandler}
                  >
                     {statusOptions.map((value, i) => {
                        return (
                           <option key={i} value={value}>
                              {value}
                           </option>
                        );
                     })}
                  </select>
               </div>

               <FRcreate
                  type="text"
                  name="createdBy"
                  onChange={onchangeHandler}
               />
            </div>
            <div className={classes.buttonbox}>
               <button disabled={isLoading}>Submit</button>
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     clearValues();
                  }}
               >
                  clear all
               </button>
            </div>
         </form>
      </section>
   );
}

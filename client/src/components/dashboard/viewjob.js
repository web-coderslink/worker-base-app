import classes from './viewjob.module.css';
import React, { useEffect } from 'react';
import { useAppContext } from '../context/appcontext';
import JobContainer from '../UI/jobContainer';
import PageContainer from '../UI/pagecontainer';

const Viewjob = () => {
   let {
      getJobs,
      jobs,
      isLoading,
      page,
      totalJobs,
      sort,
      sortOptions,
      statusOptions,

      jobTypeOptions,
      clearfilter,
      search,
      HandleChange,

      searchStatus,
      searchType,
   } = useAppContext();

   useEffect(() => {
      getJobs();
   }, [page, search, searchStatus, searchType, sort,getJobs]);

   if (jobs.length === 0) {
      return (
         <>
            <h2>No jobs to display</h2>
         </>
      );
   }

   const handleChnage = (e) => {
      if (isLoading) return;
   
      HandleChange({ name: e.target.name, value: e.target.value });
   };

   const onSubmithandler = (e) => {
      e.preventDefault();
      clearfilter();
   };

   return (
      <main className={classes.viewjob}>
         <section className={classes.searchbar}>
            <h3>search bar</h3>

            <form>
               <div className={classes.opt}>
                  <div className={classes.row}>
                     <label htmlFor="search">search</label>
                     <input
                        type="search"
                        value={search}
                        placeholder="search"
                        name="search"
                        onChange={handleChnage}
                     ></input>
                  </div>
                  <div className={classes.row}>
                     <label>Sort</label>
                     <select name="sort" value={sort} onChange={handleChnage}>
                        {sortOptions.map((z, i) => {
                           return (
                              <option value={z} key={i}>
                                 {z}
                              </option>
                           );
                        })}
                     </select>
                  </div>
                  <div className={classes.row}>
                     <label>job type</label>
                     <select
                        name="searchType"
                        value={searchType}
                        onChange={handleChnage}
                     >
                        <option>all</option>
                        {jobTypeOptions.map((z, i) => {
                           return (
                              <option value={z} key={i}>
                                 {z}
                              </option>
                           );
                        })}
                     </select>
                  </div>
                  <div className={classes.row}>
                     <label>Status</label>
                     <select
                        name="searchStatus"
                        value={searchStatus}
                        onChange={handleChnage}
                     >
                        <option>all</option>
                        {statusOptions.map((z, i) => {
                           return (
                              <option value={z} key={i}>
                                 {z}
                              </option>
                           );
                        })}
                     </select>
                  </div>
               </div>
            </form>
            <button onClick={onSubmithandler}>Clear Filter</button>
         </section>
         <section className={classes.joblist}>
            <div className={classes.gist}>
               {!isLoading && <span>...Loading</span>}
              {isLoading && <div style={{backgroundColor:'mintcream',padding:'4%',borderRadius:'10px'}}>{totalJobs} job{jobs.length > 1 && 's'} found!!</div>}<div>job list:</div>
            </div>
            <table className={classes.jobcontainer}>
               {jobs.map((job) => {
                  return (
                     <td>
                        <JobContainer key={job._id} {...job} />
                     </td>
                  );
               })}
            </table>
         </section>
         <PageContainer />
      </main>
   );
};

export default Viewjob;

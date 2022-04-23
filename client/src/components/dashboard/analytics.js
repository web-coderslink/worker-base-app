import { useEffect } from 'react';
import React from "react";
import { useAppContext } from '../context/appcontext';
import ChartContainer from './ChartContainer';
import StatsContainer from './statsContainer';
import classes from './analytics.module.css'
const Analyse = () => {
   const { showStats, monthlyApplications } = useAppContext();

   useEffect(() => {
      showStats();
   });

   return (
      <section className={classes.analytics} >
        <StatsContainer />
         {monthlyApplications.length > 0 && <ChartContainer />}
      
         </section>
   );
};

export default Analyse;

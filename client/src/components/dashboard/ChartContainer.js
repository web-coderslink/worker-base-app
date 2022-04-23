import Barchartcomp from '../UI/Barchart';
import React from 'react';
import Areachartcomp from '../UI/AreaChart';
import { useState } from 'react';
import { useAppContext } from '../context/appcontext';
import classes from './chartcontainer.module.css';

const ChartContainer = () => {
   const [barChart, setBarChart] = useState(true);
   const { monthlyApplications: data } = useAppContext();

   return (
      <section className={classes.chartCont}>
         <div className={classes.contain}>
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '10px',
               }}
            >
               <h4>Monthly Applications</h4>
               <button 
                  type="button"
                  onClick={() => {
                     setBarChart(!barChart);
                  }}
               >
                  switch
               </button>
            </div>

            {barChart ? (
               <Barchartcomp data={data} />
            ) : (
               <Areachartcomp data={data} />
            )}
         </div>
      </section>
   );
};

export default ChartContainer;

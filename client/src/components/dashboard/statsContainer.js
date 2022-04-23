import { useAppContext } from "../context/appcontext";
import React from "react";
import {FaSuitcaseRolling,FaCalendarCheck,FaBug} from 'react-icons/fa'
import StatsItem from "../UI/statsItem";
import classes from './statsContainer.module.css'


const StatsContainer=()=>{

    const {stats} = useAppContext();

    const statsoutput=[{
        id:0,
          title:'job declined',
          icon:<FaBug />,
          color:'red',
          background:'red',
          stats:stats.declined || 0,
    },{
        id:1,
        title:'job accepted',
        icon:<FaSuitcaseRolling />,
        color:'green',
        background:'green',
        stats:stats.interview || 0,
    },{
        id:2,
        title:'job pending',
        icon:<FaCalendarCheck />,
        color:'blue',
        background:'blue',
        stats:stats.pending || 0,
    }]

    return(

        <section className={classes.statCont}>
            
            <div className={classes.stateContainer}>{statsoutput.map((z)=>{
                return  <StatsItem key={z.id} title={z.title} icon={z.icon} color={z.color} background={z.background} stats={z.stats} />
        })}</div>
        </section>
        
    )
}

export default StatsContainer;
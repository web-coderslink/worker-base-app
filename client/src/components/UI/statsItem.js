import React from "react";
import classes from './../dashboard/statsContainer.module.css'

const StatsItem=({title,icon,color,background ,stats})=>{

    return(
        <div className={classes.statitem}>
            <article>
                <header style={{color:`${color}`}}>{title}</header>
                <main style={{display:'flex',justifyContent:'space-around',height:'8rem',alignItems:'center'}}>
                    <div>{stats}</div>
                    <div>{icon}</div>
                    
                </main>
                <div style={{backgroundColor:`${background}`,height:'1rem',width:'100%'}}></div>
            </article>
        </div>
    )
}

export default StatsItem;
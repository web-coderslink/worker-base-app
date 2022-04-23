import classes from './../register.module.css'
import React from "react";
import { useAppContext } from '../context/appcontext'

const Alert =(props)=>{
    const {alertType,alertText}=useAppContext();
    return(
        <span className={classes.alert} style={{background:'mintcream',color:alertType,
        margin:'5%',padding:'2%',borderRadius:'20px'}}> {alertText}</span>
    )
}

export default Alert;
import classes from './FRcreate.module.css'
import React from "react";
export default function FRcreate(props) {
  
    return (
      <div className={classes.formrow}>
        <label htmlFor={props.name}>{props.name}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
        onChange={props.onChange}
        ></input>
      </div>
    );
  }
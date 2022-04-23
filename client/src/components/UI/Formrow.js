
import classes from './formrow.module.css'
import React from "react";

export default function FormRow(props) {
  
  return (
    <div className={classes.formrow}>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
      onChange={props.handlechange}
      ></input>
    </div>
  );
}

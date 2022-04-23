import classes from './profileForm.module.css'
import React from "react";
export default function FormRowProfile(props) {
  
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
  
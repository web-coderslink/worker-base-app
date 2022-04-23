import { useEffect, useState } from 'react';
import React from "react";
import FormRow from './UI/Formrow';
import classes from './register.module.css';
import { useAppContext } from './context/appcontext';
import { useNavigate } from 'react-router-dom';
import Alert from './UI/Alert';

const initialState = {
   name: '',
   email: '',
   password: '',
   ismember: false,
};
export default function Register() {
   const navigate = useNavigate();
   const [values, setValues] = useState(initialState);
   const {
      user,
      isLoading,
      setupUser,
      showAlert,
      displayAlert,
   } = useAppContext();

   function handlechange(e) {
      setValues({ ...values, [e.target.name]: e.target.value });
   }

   function changetemp(e) {

      e.preventDefault();
      setValues({ ...values, ismember: !values.ismember });
   }

   function Submithandler(e) {
      e.preventDefault();

      const { name, email, password, ismember } = values;

      if (!password || !email || (ismember && !name)) {
         displayAlert();
         return;
      }

      const CurrentUser = { name, email, password };
      if (ismember) {
  
         setupUser({
            CurrentUser,
            endPoint: 'reg',
            alertText: 'user created!redirected....',
         });
      } else {
        
         setupUser({
            CurrentUser,
            endPoint: 'login',
            alertText: 'loggedin..!redirected....',
         });
      }
   }

   useEffect(() => {

      if (user) {
         setTimeout(() => {
            navigate('/dashBoard/viewjob');
         }, 3000);
      }
      
   }, [user, navigate]);

   return (
      <div className={classes.formcontrol}>
         <form onSubmit={Submithandler}>
            <h3>{values.ismember === true ? 'Signup' : 'Login'}</h3>
            {showAlert && <Alert />}
            <div className={classes.formcol}>
               {values.ismember && (
                  <FormRow
                     type="text"
                     name="name"
                     value={values.name}
                     handlechange={handlechange}
                  />
               )}

               <FormRow
                  type="email"
                  name="email"
                  value={values.email}
                  handlechange={handlechange}
               />
               <FormRow
                  type="password"
                  name="password"
                  value={values.password}
                  handlechange={handlechange}
               />
               <button
                  type="submit"
                  className={classes.submit}
                  disabled={isLoading}
           
               >
                  Submit
               </button>
               <p>
                  {values.ismember === false
                     ? 'Not a new member?'
                     : 'already a member?'}
                  <button className={classes.Regbtn} onClick={changetemp}>
                     {values.ismember === false ? 'Register' : 'Login'}
                  </button>
               </p>
            </div>
         </form>
      </div>
   );
}

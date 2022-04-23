import classes from './profile.module.css';
import React from 'react';
import FormRowProfile from '../UI/FormRowProfile';
import { useAppContext } from '../context/appcontext';
import { useState } from 'react';
import Alert from '../UI/Alert';

const Settings = () => {
   const {
      user,
      showAlert,
      displayAlert,
      updateUser,
      isLoading
   } = useAppContext();

   const [name, setname] = useState(user?.name);
   const [lastName, setLastName] = useState(user?.lastName);
   const [email, setEmail] = useState(user?.email);
   const [location, setLocation] = useState(user?.location);

   function handlechange(e) {
      e.preventDefault();


      if (!name || !email || !lastName || !location) {
       
         displayAlert();
         return;
      }

      updateUser({ name, email, lastName, location });
   }

   return (
      <section className={classes.profile}>
      
         <form onSubmit={handlechange}>
         <h2>Welcome {user.name}. . . .</h2>
         {showAlert && <Alert/>}
            
            <div>
               <FormRowProfile
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setname(e.target.value)}
               />
               <FormRowProfile
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
               />
               <FormRowProfile
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
               <FormRowProfile
                  type="text"
                  name="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
               />

               <button type="submit" disabled={isLoading}>
                  {isLoading ? 'please wait...' : 'Submit'}
               </button>
            </div>
         </form>
      </section>
   );
};

export default Settings;

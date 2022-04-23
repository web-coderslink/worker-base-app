import {  useState } from 'react';
import React from 'react';
import classes from './Mainbody.module.css';
import {  FaStar } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

import {
   FaAngleDown,
   FaBlackTie,
   FaFly,
   FaMarker,
   FaPoll,
   FaSlidersH,
   FaStream,
   FaUser,
} from 'react-icons/fa';
import { useAppContext } from './context/appcontext';


export default function Mainbody() {
   const { logoutUser, user,createRating} = useAppContext();
   const [para, setpara] = useState(false);
   const [hide, sethide] = useState(true);
   const [Rateing,setrateing]=useState(5);

   function hidebar() {
      setpara(!para);
   }

   function hideControl() {
      sethide(!hide);

   }
   return (
      <main className={classes.MainPage}>
         <article>
            <header style={para ? { width: '100%', margin: '0' } : null}>
               <span
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                  }}
               >
                  <FaBlackTie></FaBlackTie>
                  {'...'}JOB.in
               </span>
               <button onClick={hidebar}>
                  <FaStream></FaStream>
               </button>
               <h3>Dashboard</h3>
               <div>
                  <div className={classes.idname} onMouseLeave={hideControl}>
                     <span>
                        <FaUser></FaUser>
                        {user.name}
                     </span>
                     <span>
                        <FaAngleDown></FaAngleDown>
                     </span>
                  </div>
                  <NavLink to="/">
                     <button
                        style={{ display: `${hide ? 'none' : 'block'}` }}
                        className={classes.logoutbtn}
                        onClick={() => logoutUser()}
                     >
                        logout
                     </button>
                  </NavLink>
               </div>
            </header>

            <section className={classes.headtile}>
               <div
                  className={classes.navarea}
                  style={para ? { display: 'none' } : null}
               >
                  <NavLink to="/dashboard/createjob">
                     <button
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        <FaMarker></FaMarker>CREATE JOB
                     </button>
                  </NavLink>

                  <NavLink to="/dashboard/analysis">
                     <button
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        <FaPoll></FaPoll> ANALYTICS
                     </button>
                  </NavLink>
                  <NavLink to="/dashboard/settings">
                     <button
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        <FaSlidersH></FaSlidersH> SETTINGS
                     </button>
                  </NavLink>

                  <NavLink to="/dashboard/viewjob">
                     <button
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        <FaFly></FaFly> VIEW JOB
                     </button>
                  </NavLink>
               </div>

               <div className={classes.outlet}>
                  <Outlet></Outlet>
               </div>
            </section>

            <footer>
               <section> Created by Vanathi Tulip</section>

               <section className={classes.Section}>
                  <form
                     className={classes.card}
                     onSubmit={(e)=>{
                        e.preventDefault();
                        const rateing={
                           rateing:Rateing
                        }
                         createRating(rateing)
                     }}
                  >
                     <span>Rate</span>
                     <div onChange={(e) => { setrateing(e.target.value);
                     }} className={classes.rating}>
                        <input
                           type="radio"
                           value="5"
                           name="rate"
                           id="rate-5"
                        ></input>
                        <label htmlFor="rate-5">
                           <FaStar></FaStar>
                        </label>

                        <input
                           type="radio"
                           value="4"
                           name="rate"
                           id="rate-4"
                        ></input>
                        <label htmlFor="rate-4">
                           <FaStar></FaStar>
                        </label>

                        <input
                           type="radio"
                           value="3"
                           name="rate"
                           id="rate-3"
                        ></input>
                        <label htmlFor="rate-3">
                           <FaStar></FaStar>
                        </label>

                        <input
                           type="radio"
                           value="2"
                           name="rate"
                           id="rate-2"
                        ></input>
                        <label htmlFor="rate-2">
                           <FaStar></FaStar>
                        </label>

                        <input
                           type="radio"
                           value="1"
                           name="rate"
                           id="rate-1"
                        ></input>
                        <label htmlFor="rate-1">
                           <FaStar></FaStar>
                        </label>
                     </div>
                     <button type="submit" className={classes.sbtn}>
                        submit
                     </button>
                  </form>
               </section>
            </footer>
         </article>
      </main>
   );
}

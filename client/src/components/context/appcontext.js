import {  useReducer, useContext} from 'react';

import reducer from './reducer';
import axios from 'axios';
import React from 'react';
import {
   DISPLAY_ALERT,
   CLEAR_ALERT,
   REGISTER_USER_BEGIN,
   REGISTER_USER_ERR,
   REGISTER_USER_SUCC,
   LOGIN_USER_BEGIN,
   LOGIN_USER_ERR,
   LOGIN_USER_SUCC,
   SETUP_USER_BEGIN,
   SETUP_USER_SUCC,
   SETUP_USER_ERR,
   UPDATE_USER_BEGIN,
   UPDATE_USER_ERR,
   UPDATE_USER_SUCC,
   HANDLE_CHANGE,
   CLEAR_VALUES,
   CREATE_JOB_BEGIN,
   CREATE_JOB_ERR,
   CREATE_JOB_SUCC,
   GET_JOB_BEGIN,
   GET_JOB_ERR,
   GET_JOB_SUCC,
   SET_EDIT_JOB,
   DELETE_JOB_BEGIN,
   EDIT_JOB_BEGIN,
   EDIT_JOB_SUCC,
   EDIT_JOB_ERR,
   SHOW_JOB_BEGIN,
   SHOW_JOB_SUCC,
   CLEAR_FILTERS,
   CHANGE_PAGE,
   LOGOUT_USER,
   CREATE_RATING_BEGIN,
   CREATE_RATING_SUCC,
   CREATE_RATING_ERR,
   GET_RATING_BEGIN,
   GET_RATING_SUCC,
} from './actions';


const token = localStorage.getItem('token');
const users = localStorage.getItem('user');
const userlocation = localStorage.getItem('location');

const initialState = {
   isLoading: false,
   showAlert: false,
   alertText: '',
   alertType: '',
   user: users ? JSON.parse(users) : null,
   token: token,
   userLocation: userlocation || '',
   isEditing: false,
   editJobId: '',
   position: '',
   company: '',
   jobLocation: userlocation || '',
   jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
   jobType: 'full-time',
   statusOptions: ['interview', 'declined', 'pending'],
   status: 'pending',
   search: '',
   searchStatus: 'all',
   searchType: '',
   sort: 'latest',
   sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
   jobs: [],
   totalJobs: 0,
   numOfPages: 1,
   page: 1,
   stats: {},
   monthlyApplications: [],
   rateing: 5,
   trate: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const clearfilter = () => {

      dispatch({ type: CLEAR_FILTERS });
   };
   //axios
   //axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`; // its a base method too, axios can fetch mulitple request at atime so we need to mention specific path only

   const authfetch = axios.create({
      baseURL: '/api/v1/',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   // const authfetch = axios.create({
   //    baseURL: 'http://localhost:5000/'
   //    // headers:{
   //    //    Authorization:`Bearer ${state.token}`      } // can be removed its for our understanding
   // });

   authfetch.interceptors.request.use(
      (config) => {
         config.headers.common['Authorization'] = `Bearer ${token}`;
         return config;
      },
      (error) => {
         return Promise.reject(error);
      }
   ); // interceptors returns multiple function

   authfetch.interceptors.response.use(
      (response) => {
         return response;
      },
      (error) => {
      
         if (error.response.status === '401') {
           console.log("aunthentication error");
         }
         return Promise.reject(error);
      }
   ); // interceptors returns multiple function

   //display alert
   const displayAlert = () => {
   
      dispatch({ type: DISPLAY_ALERT });
      clearAlert();
   };

   //clear alerts
   const clearAlert = () => {
      setTimeout(() => {
         dispatch({ type: CLEAR_ALERT });
      }, 3000);
   };

   //register new user
   const addUserToLocalStorage = ({ user, token, location }) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('location', location);
   };

   const removeUserFromLocalStorage = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('location');
   };

   const registerUser = async (currentUser) => {
      //(currentUser);
      dispatch({ type: REGISTER_USER_BEGIN });
      try {
         const response = await axios.post(
            '/api/v1/auth/reg',
            currentUser
         );
         // (response);
         const { result, token, location } = response.data;

         dispatch({
            type: REGISTER_USER_SUCC,
            payload: { result, token, location },
         });
         addUserToLocalStorage({ token, location, result });
      } catch (error) {
         //console.log(error.response);
         dispatch({
            type: REGISTER_USER_ERR,
            payload: { msg: error },
         });
      }

      clearAlert();
   };

   //login setup

   const loginUser = async (CurrentUser) => {

      dispatch({ type: LOGIN_USER_BEGIN });
      try {
         const response = await axios.post(
            '/api/v1/auth/login',
            CurrentUser
         );
         const { result, token, location } = response.data;

         dispatch({
            type: LOGIN_USER_SUCC,
            payload: { result, token, location },
         });

         addUserToLocalStorage({ token, location, result });
      } catch (error) {
         dispatch({
            type: LOGIN_USER_ERR,
            payload: { msg: error },
         });
         clearAlert();
      }
   };

   //setup user {combining registering and logging in}

   const setupUser = async ({ CurrentUser, endPoint, alertText }) => {

      dispatch({ type: SETUP_USER_BEGIN });
      try {
         const response = await axios.post(
            `/api/v1/auth/${endPoint}`,
            CurrentUser
         );
         const { user, token, location } = response.data;

         dispatch({
            type: SETUP_USER_SUCC,
            payload: { user, token, location, alertText },
         });

         addUserToLocalStorage({ token, location, user });
      } catch (error) {
         dispatch({
            type: SETUP_USER_ERR,
            payload: { msg: error },
         });
         clearAlert();
      }
   };

   const updateUser = async (currentUser) => {


      // const { data } = await axios.patch(
      //    'http://localhost:5000/auth/update/',
      //    currentUser
      // ); // another request can also be made in here

      //    const { data } = await axios.patch('http://localhost:5000/auth/update', currentUser,{headers:{ Authorization:`Bearer ${state.token}`}});
      //   (data);
      // };
      dispatch({ type: UPDATE_USER_BEGIN });
      try {
         const { data } = await authfetch.patch('auth/update', currentUser);

         const { user, location, token } = data;

         dispatch({
            type: UPDATE_USER_SUCC,
            payload: { user, token, location },
         });
         addUserToLocalStorage({ user, location, token });
         dispatch({ type: CLEAR_VALUES });
      } catch (error) {
         dispatch({
            type: UPDATE_USER_ERR,
            payload: { msg: error },
         });
      }
      clearAlert();
   };

   const HandleChange = ({ name, value }) => {
      dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
   };

   const clearValues = () => {
      dispatch({ type: CLEAR_VALUES });
   };

   const createjob = async () => {
  
      dispatch({ type: CREATE_JOB_BEGIN });
      try {
         const { position, company, jobLocation, jobType, status } = state;
         await authfetch.post('jobs/createjob', {
            position,
            company,
            jobLocation,
            jobType,
            status,
         });
         dispatch({ type: CREATE_JOB_SUCC });
         dispatch({ type: CLEAR_VALUES });
      } catch (error) {
         if (error.response.status === 401) return;
         dispatch({
            type: CREATE_JOB_ERR,
            payload: { msg: error },
         });
         logoutUser();
      }
      clearAlert();
   };

   const createRating = async (rating) => {
  
      dispatch({ type: CREATE_RATING_BEGIN });
      try {
         const { rateing } = rating;
         await authfetch.post('rateUser/rate', {
            rateing,
         });
         dispatch({ type: CREATE_RATING_SUCC });
      } catch (error) {
         if (error.response.status === 401) return;
         dispatch({
            type: CREATE_RATING_ERR,
            payload: { msg: error },
         });
         logoutUser();
      }
      clearAlert();
   };

   const getAllRating = async () => {
      let url = 'rateUser/allrate';

      dispatch({ type: GET_RATING_BEGIN });
      try {
         const { data } = await authfetch(url);
         const { rateings, numOfRatings } = data;
 
         dispatch({
            type: GET_RATING_SUCC,
            payload: { rateings, numOfRatings },
         });
      } catch (error) {
         logoutUser();
      }
      clearAlert();
   };

   

   const logoutUser = () => {
      dispatch({ type: LOGOUT_USER });
      removeUserFromLocalStorage();
   };
   const getJobs = async () => {
      const { page, search, searchStatus, searchType, sort } = state;
      //let url = `jobs/getall?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
      let url = `jobs/getall?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

      if (search) {
         url = url + `&search=${search}`;
      }
      dispatch({ type: GET_JOB_BEGIN });
      try {
         const { data } = await authfetch(url);
         const { jobs, totalJobs, numOfPages } = data;
      
         dispatch({
            type: GET_JOB_SUCC,
            payload: { jobs, totalJobs, numOfPages },
         });
      } catch (error) {
         if (error.response.status === 401) return;
         dispatch({
            type: GET_JOB_ERR,
            payload: { msg: error },
         });
         logoutUser();
      }
      clearAlert();
   };

   // useEffect(() => {
   //    getJobs();
   // }, []);

   const setEditJob = (id) => {
     
      dispatch({ type: SET_EDIT_JOB, payload: { id } });
   };

   const editjob = async () => {
     ('edit job');
      dispatch({ type: EDIT_JOB_BEGIN });
      try {
         const { position, company, jobLocation, jobType, status } = state;

         await authfetch.patch(`jobs/updatejob/${state.editJobId}`, {
            position,
            company,
            jobLocation,
            jobType,
            status,
         });
         dispatch({
            type: EDIT_JOB_SUCC,
         });

         dispatch({
            type: CLEAR_VALUES,
         });
      } catch (error) {
         if (error.response.status === 401) return;
         dispatch({
            type: EDIT_JOB_ERR,
            payload: { msg: error },
         });
         logoutUser();
      }
   };

   const deleteJob = async (id) => {
     
      dispatch({ type: DELETE_JOB_BEGIN });
      try {
         await authfetch.delete(`jobs/deletejob/${id}`);
         getJobs();
      } catch (error) {
         logoutUser();
      }
   };

   const showStats = async () => {
      dispatch({ type: SHOW_JOB_BEGIN });
      try {
         const { data } = await authfetch.get('/jobs/analyse');
        
         dispatch({
            type: SHOW_JOB_SUCC,
            payload: {
               stats: data.defultstats,
               monthlyApplications: data.monthlyApplications,
            },
         });
      } catch (error) {
         logoutUser();
      }
      clearAlert();
   };

   const changePage = (page) => {
      dispatch({ type: CHANGE_PAGE, payload: { page } });
   };

   return (
      <AppContext.Provider
         value={{
            ...state,
            displayAlert,
            setupUser,
            setEditJob,
            deleteJob,
            updateUser,
            registerUser,
            loginUser,
            clearAlert,
            HandleChange,
            clearValues,
            createjob,
            editjob,
            showStats,
            clearfilter,
            getJobs,
            changePage,
            logoutUser,
            createRating,
            getAllRating,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

const useAppContext = () => {
   return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

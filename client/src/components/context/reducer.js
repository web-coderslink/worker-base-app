
import {
   DISPLAY_ALERT,
   REGISTER_USER_BEGIN,
   REGISTER_USER_ERR,
   REGISTER_USER_SUCC,
   CLEAR_ALERT,
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
   GET_JOB_SUCC,
   SET_EDIT_JOB,
   DELETE_JOB_BEGIN,
   EDIT_JOB_BEGIN,
   EDIT_JOB_ERR,
   EDIT_JOB_SUCC,
   SHOW_JOB_BEGIN,
   SHOW_JOB_SUCC,
   CLEAR_FILTERS,
   CHANGE_PAGE,
   LOGOUT_USER,
   GET_RATING_BEGIN,
   GET_RATING_SUCC,
   CREATE_RATING_BEGIN,
   CREATE_RATING_SUCC,
   CREATE_RATING_ERR,
} from './actions';
import { initialState } from './appcontext';


const reducer = (state, action) => {

   if (action.type === DISPLAY_ALERT) {
      return {
         ...state,
         showAlert: true,
         alertType: 'red',
         alertText: 'please provide all details',
      };
   }

   if (action.type === CLEAR_ALERT) {
      return {
         ...state,
         showAlert: false,
         alertType: '',
         alertText: '',
      };
   }

   if (action.type === REGISTER_USER_BEGIN) {
      return { ...state, isLoading: true };
   }

   if (action.type === REGISTER_USER_SUCC) {
      return {
         ...state,
         isLoading: false,
         token: action.payload.token,
         user: action.payload.result,
         userLocation: action.payload.location,
         jobLocation: action.payload.location,
         showAlert: true,
         alertType: 'green',
         alertText: 'user created!Redirecting....',
      };
   }

   if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        user: null,
        token: null,
        jobLocation: '',
        userLocation: '',
      }
    }

   if (action.type === REGISTER_USER_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: action.payload,
         alertType: 'red',
      };
   }

   if (action.type === UPDATE_USER_BEGIN) {
      return { ...state, isLoading: true };
   }
   if (action.type === UPDATE_USER_SUCC) {
      return {
         ...state,
         isLoading: false,
         token: action.payload.token,
         user: action.payload.user,
         userLocation: action.payload.location,
         jobLocation: action.payload.location,
         showAlert: true,
         alertType: 'green',
         alertText: 'User Profile Updated!',
      };
   }
   if (action.type === UPDATE_USER_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'red',
         alertText: action.payload,
      };
   }

   if (action.type === LOGIN_USER_BEGIN) {
      return { ...state, isLoading: true };
   }

   if (action.type === LOGIN_USER_SUCC) {
      return {
         ...state,
         isLoading: false,
         token: action.payload.token,
         user: action.payload.result,
         userLocation: action.payload.location,
         jobLocation: action.payload.location,
         showAlert: true,
         alertType: 'green',
         alertText: 'Logging in....',
      };
   }

   if (action.type === LOGIN_USER_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: action.payload,
         alertType: 'red',
      };
   }

   if (action.type === SETUP_USER_BEGIN) {
      return { ...state, isLoading: true };
   }

   if (action.type === SETUP_USER_SUCC) {
      return {
         ...state,
         isLoading: false,
         token: action.payload.token,
         user: action.payload.result,
         userLocation: action.payload.location,
         jobLocation: action.payload.location,
         showAlert: true,
         alertType: 'green',
         alertText: action.payload.alertText,
      };
   }

   if (action.type === SETUP_USER_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: action.payload,
         alertType: 'red',
      };
   }

   if (action.type === SETUP_USER_BEGIN) {
      return { ...state, isLoading: true };
   }

   if (action.type === SETUP_USER_SUCC) {
      return {
         ...state,
         isLoading: true,
         token: action.payload.token,
         user: action.payload.result,
         userLocation: action.payload.location,
         jobLocation: action.payload.location,
         showAlert: true,
         alertType: 'green',
         alertText: 'user profile updated',
      };
   }

   if (action.type === SETUP_USER_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: action.payload,
         alertType: 'red',
      };
   }

   if (action.type === HANDLE_CHANGE) {
      console.log(action);
      return {
         ...state,page:1,
         [action.payload.name]: action.payload.value,
      };
   }

   if (action.type === CLEAR_VALUES) {
      console.log('hereeeeee');

      return {
         ...state,
         isEditing: false,
         editJobId: '',
         position: '',
         company: '',
         jobLocation: state.userLocation || '',
         jobType: 'full-time',
         status: 'pending',
      };
   }

   if (action.type === CREATE_JOB_BEGIN) {
      return {
         ...state,
         isLoading: true
      };
   }

   if (action.type === CREATE_JOB_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'error',
         alertText: 'error check the contents',
      };
   }

   if (action.type === CREATE_JOB_SUCC) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'success',
         alertText: action.payload,
      };
   }

   if (action.type === GET_JOB_BEGIN) {
      return { ...state, isLoading: true, showAlert: false };
   }

   if (action.type === GET_RATING_BEGIN){
        return {...state,isLoading:true,showAlert:false};
   }

   if (action.type === GET_JOB_SUCC)
      return {
         ...state,
         isLoading: false,
         jobs: action.payload.jobs,
         totalJobs: action.payload.totalJobs,
         numOfPages: action.payload.numOfPages,
      };

      
   if (action.type === GET_RATING_SUCC)
   return {
      ...state,
      isLoading: false,
      trate: action.payload.numOfRatings,
   };
   

   if (action.type === SET_EDIT_JOB) {
      console.log("inside set edit job");
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
         ...state,
         isEditing: true,
         editJobId: _id,
         position,
         company,
         jobLocation,
         jobType,
         status,
      };
   }

   if (action.type === DELETE_JOB_BEGIN) {
      return { ...state, isLoading: true };
   }

   if (action.type === EDIT_JOB_BEGIN) {
      return { ...state, isLoading: true };
   }

   if (action.type === EDIT_JOB_SUCC) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'green',
         alertText: 'successfully updated the job',
      };
   }

   if (action.type === EDIT_JOB_ERR){

   return   {...state,
         isLoading: false,
         showAlert: true,
         alertType: 'red',
         alertText: action.payload,}
   }

   if(action.type === SHOW_JOB_BEGIN){
      return {...state,isLoading:true,showAlert:false}
   }

   if(action.type === SHOW_JOB_SUCC){
      return{
         ...state,isLoading:false,stats:action.payload.stats,
         monthlyApplications:action.payload.monthlyApplications
      }
   }

   if(action.type === CLEAR_FILTERS){

      return {...state,search:'',searchStatus:'all',searchType:'all',sort:'latest'}
   }

   if(action.type === CHANGE_PAGE){
      return {...state,page:action.payload.page}
   }

   if(action.type === CREATE_RATING_BEGIN){
      return{...state,isLoading:true}
   }

   if (action.type === CREATE_RATING_SUCC){
      return{
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'success',
         alertText: "thankyou for the feed back",
      };
   }

   if (action.type === CREATE_RATING_ERR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'error',
         alertText: 'Authentication issues',
      };
   }


      throw new Error('no such action   : ', action.type);
};

export default reducer;

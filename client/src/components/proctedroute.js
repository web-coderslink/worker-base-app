import { useAppContext } from "./context/appcontext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute =({children})=>{

    const {user} = useAppContext();
    if(!user){
        return  <Navigate to='/'></Navigate>
    }
    return children
}

export default ProtectedRoute;
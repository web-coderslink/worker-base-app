import AuthenticationError from "../errors/authenticationerror.mjs";



const checkPermissions = (requestUser,resourceUserId)=>{
  
    if(requestUser.id === resourceUserId.toString()) return
        throw new AuthenticationError('not authorized to access this route')
}

export default checkPermissions;
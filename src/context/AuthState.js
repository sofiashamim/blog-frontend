import React, { useState } from 'react'
import AuthContext  from "./AuthContext";

const AuthState = (props) => {
  let log =JSON.parse(localStorage.getItem('logoKiDetails'))
    const [userDetail, setuserDetail] = useState({
        name:log?log.name:"",
        _id:log?log._id:"",
        login:log?true:false

    });

    console.log(userDetail)
  return (
   <AuthContext.Provider value={{userDetail,setuserDetail}}>
{props.children}
   </AuthContext.Provider>
  )
}

export default AuthState

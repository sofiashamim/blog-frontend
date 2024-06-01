import React, { useContext, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../context/AuthContext';


 const Login = () => {

  let store= useContext(AuthContext);
  console.log(store)

  let navigate= useNavigate()

  let emailRef= useRef()
  let passwordRef= useRef()

  const handleLogin =async(e)=>{
    e.preventDefault();
let obj={
  email: emailRef.current.value,
  password:passwordRef.current.value
}
console.log(obj)

let res= await axios.post('https://blog-backend-crud.onrender.com/api/auth/login', obj)
console.log(res.data)
if(res.data.success){
  localStorage.setItem('logoKiDetails',JSON.stringify(res.data.user))
  store.setuserDetail({
    name:res.data.user.name,
    _id:res.data.user._id,
    login:true
  })
  navigate('/')
  toast.success(res.data.msg,{position:"top-center"})
}
else{
  toast.error(res.data.msg)
}
  }

  return (
  
    <form  onSubmit={handleLogin} className='loginpage'>
       <h1 className='text-center'>Login Page</h1>
    
    <label htmlFor="">Email</label>
    <input ref={emailRef} type="email" />
    <label htmlFor="">Password</label>
    <input ref={passwordRef} type="password" />
     <p>Not a user?  <Link to="/register">Sinup?</Link>   </p>
    <button type='submit' >Submit</button>
    </form>
  ) 
}

export default Login 

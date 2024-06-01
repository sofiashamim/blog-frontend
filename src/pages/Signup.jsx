import React, { useRef } from 'react'
import {Link,  useNavigate} from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  let navigate= useNavigate()

    let nameRef= useRef()
    let emailRef= useRef()
    let passwordRef= useRef()
    let addressRef= useRef()

    const handleSubmit= async ()=>{
        let obj={
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            address:addressRef.current.value,
          
        }
        console.log(obj)

        let req=await fetch( 'https://blog-backend-crud.onrender.com/api/auth/register',{
          method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })

        let datas =await req.json();
        console.log(datas)
        if(datas.success===true){
            navigate('/')
            toast.success(datas.msg,{position: "top-center"});
        }
        else{
            toast.error(datas.msg,{position: "top-center"}); 
        }
      }


  return (
    <div>
      <label htmlFor="">Name</label>
      <input ref={nameRef} type="text" />
      <label htmlFor="">Email</label>
      <input ref={emailRef} type="text" />
      <label htmlFor="">Password</label>
      <input ref={passwordRef} type="text" />
      <label htmlFor="">Address</label>
      <input ref={addressRef} type="text" />
      <p >Already a user? <Link to='/'>Login</Link> </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Signup

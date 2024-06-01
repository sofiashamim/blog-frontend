import React, { useRef } from 'react'
import { useContext } from 'react'
import {  useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { toast } from 'react-toastify'

const Setting = () => {
    let navigate= useNavigate()

    let store= useContext(AuthContext)
    console.log(store.userDetail._id)
    let id= store.userDetail._id
    
    let nameRef= useRef()
    
    let passwordRef= useRef()
    let addressRef= useRef()

    const handleSubmit=async()=>{


        let obj={
            name:nameRef.current.value,
            // email:emailRef.current.value,
            password:passwordRef.current.value,
            address:addressRef.current.value,
          
        }
        console.log(obj)

        let req= await fetch(`https://blog-backend-crud.onrender.com/api/auth/${id}`,
            {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            
            }
        )
        let idData =await req.json();
        console.log(idData)
        if(idData.success===true){
            navigate('/')
            toast.success(idData.msg,{position: "top-center"});
        }
    }


  return (
    <div className='settingForm'>
    <div className='setform'>
        <h3 style={{color: "white"}}>User settings</h3>
    <label htmlFor="">Change Name</label>
      <input ref={nameRef} type="text" />
      
      <label htmlFor="">Change Password</label>
      <input ref={passwordRef} type="password" />
      <label htmlFor="">Change Address</label>
      <input ref={addressRef} type="text" />
    
      <button onClick={handleSubmit}>Update information</button>
    </div>
    </div>
  )
}

export default Setting

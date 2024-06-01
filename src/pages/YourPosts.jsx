import React ,{ useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const YourPosts = () => {

    const [mypost, setmypost] = useState([]);
    const [showForm, setshowForm] = useState();
    const [postId, setpostId] = useState("");

    const titleRef = useRef();
    const descRef = useRef();
    

    let store= useContext(AuthContext)
    console.log(store.userDetail._id)
    let id= store.userDetail._id

async function getYourPosts(){
    let res= await fetch(`https://blog-backend-crud.onrender.com/posts/getallposts/${id}`)
    let data= await res.json()
    console.log(data)
    setmypost(data.allPost)
}

useEffect(() => {
    getYourPosts()
}, []);

const handleDelete =async(ans)=>{
  console.log(ans)
  let alertans= window.confirm('are you sure you want to delete')
  console.log(alertans)
  if (alertans) {
    let res= await fetch(`https://blog-backend-crud.onrender.com/posts/delete/${ans._id}
    `,{
      method: 'DELETE'
    }) 
    let data= await res.json()
    console.log(data)
    getYourPosts()
  }
}
const handlesubmitedit= async(e)=>{
  e.preventDefault()
  let obj={
    title:titleRef.current.value,
    description:descRef.current.value
  }
  let res= await fetch(`https://blog-backend-crud.onrender.com/posts/update/${postId}`,
    {
      method:'PUT',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    }
  )
  let data= await res.json()
  console.log(data)
  setshowForm(false)
  getYourPosts()
}

const handleEdit =(ans)=>{
  console.log(ans)
  setpostId(ans._id)
  setshowForm(true)
}

    return (

      <div className="container">
        <div className='row d-flex justify-content-center gap-4'>
        {mypost.map((ele)=>{
          return <div className="card" style={{width: '18rem'}}>
          <RiDeleteBin5Line onClick={()=>{handleDelete(ele)}} className="deleteicon" />
          <FaEdit className="editicon" onClick={()=>handleEdit(ele)} />
          <img src={ele?.image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{ele?.title}</h5>
            <h5 className="card-title">author:{ele?.author?.name}</h5>
            <h5 className="card-title text-truncate m-50">{ele?.description}</h5>
            <Link to="/single" state={ele} className="btn btn-primary">View more</Link>
          </div>
        </div>
        })}
       </div>

{ showForm && <div id="floatingForm" className="col-md-4 p-3 ">
  <form action="">
    <button onClick={()=>setshowForm(false)} type="button" className="btn-close bg-white" aria-label="Close"></button>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input ref={titleRef} type="text" className="form-control" name="" id="title" aria-describedby="emailHelp" />

    </div>

    <div className="form-floating">
      <textarea ref={descRef} className="form-control" placeholder="leave a comment " name="" id=""></textarea>
      <label htmlFor="floatingTextArea">Description</label>

    </div>
    <button onClick={handlesubmitedit} type="submit" className="btn btn-primary mt-2">Submit</button>
  </form>

</div>}

      </div>
        


  )
}

export default YourPosts

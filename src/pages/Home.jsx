import React, { useContext, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {

  const [userpost, setuserpost] = useState([]);
  const [image, setimage] = useState();
  const [clicked, setclicked] = useState(false);

  let store= useContext(AuthContext)
  console.log(store)

  console.log(userpost)

  const titleRef = useRef();
  const descriptionRef = useRef();

  async function fetchAllPosts(){
    let res =await fetch('https://blog-backend-crud.onrender.com/posts/getalluserspost')
    let data= await res.json()
    console.log(data.allposts)
    setuserpost(data.allposts)
    
  }

  useEffect(() => {
    fetchAllPosts()
  },[]);

  const handleFileChange=(e)=>{
let value = e.target.files[0];
console.log(value)
setimage(value)
  }

  function doConvert(img){
    return new Promise((resolve,reject)=>{
      var reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function(){
        console.log(reader.result);
        resolve(reader.result)
      }
      reader.onerror = function(err){
     reject(reader.error)
      }
    })
  }

  const handleBlogSubmit=async(e)=>{
       e.preventDefault();
       let convertImage =await doConvert(image)
       console.log(convertImage)
       let obj={
        title:titleRef.current.value,
        description:descriptionRef.current.value,
        image:convertImage,
        author:store.userDetail._id
       }
       
       console.log(obj)
       let res= await fetch('https://blog-backend-crud.onrender.com/posts/create',{
         method:'POST',
         headers:{
           'Content-Type': 'application/json'
          },
          body:JSON.stringify(obj)
        })
        // console.log(obj)
        
       let data= await res.json();
       console.log(data)
       fetchAllPosts()

       setclicked(false)
  }


  return (
<div id='homebody' className="row w-100" >
<h1 className='blogname'>Aur batao..</h1>
      <h6 className='tagline'>Your digital diary</h6>
  <div id='sidebar' className='col-2 d-flex justify-content-center'>
<Sidebar setclicked={setclicked} clicked={clicked} />
  </div>
  <div className='col-10 '> 
  <div className='row d-flex justify-content-center gap-4'>
  {userpost?.map((ele)=>{
    return <div id='card' className="card" style={{width: '18rem'}}>
    <img height={"200px"} src={ele?.image} className="card-img-top" alt="..." />
    <div id='cardbox' className="card-body">
      <h5 className="card-title">Title:{ele?.title}</h5>
      <h5 className="card-title">Author:{ele?.author?.name}</h5>
      <h5 style={{font:"10px"}} className="card-title">{ele.description}</h5>
      <Link to="/single" state={ele} className="btn btn-primary">View more</Link>
      {/* <a to="/YourPosts" className="btn btn-primary">View my post</a> */}

    </div>
  </div>
  })
}

    </div>

  </div>

  <div className='formBox'>
{clicked && <form action="" className='col-md-4'>
<button onClick={()=>setclicked(false)} type="button" classNnme="btn-close" aria-label="Close">Close</button>
  <label htmlFor="">Title</label>
  <input ref={titleRef} type="text" />
  <label htmlFor="file" className='btn btn-primary'>Upload Image</label>
  <input onChange={handleFileChange} type="file" id='file' hidden />
  {!image && <img src='https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg' alt=''/>}
  {image && <img src={URL.createObjectURL(image)} alt=''/>}
  <label htmlFor="">Description</label>
  <textarea ref={descriptionRef} name="" id=""></textarea>
  <button onClick={handleBlogSubmit} className='btn btn-success'>Post blog</button>
</form>}
</div>

</div>


  
  )
}

export default Home

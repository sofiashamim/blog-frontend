import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = () => {

  let store= useContext(AuthContext)
  let navigate= useNavigate()

  const handleLogout =()=>{
    // console.log("hello")
    localStorage.removeItem('logoKiDetails')
    store.setuserDetail({
      name:"",
      _id:"",
      login:false
    })
    navigate('/login')
  }
  return (
    <div>
      <nav id='navbarid' className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <Link className="navbar-brand" id='blog' href="#">BornToBlog</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        { store.userDetail.login &&<li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>}
       {store.userDetail.login && <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/yourpost">My posts</Link>
        </li>}
       <li className="nav-item dropdown " style={{marginLeft:"800px"}}>
  <a className="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    User
  </a>
  <ul className="dropdown-menu">
    { !store.userDetail.login &&<li><Link className="dropdown-item" to="/login">Login</Link></li>}
    {!store.userDetail.login &&<li><hr className="dropdown-divider" /></li>}
    {!store.userDetail.login &&<li><Link className="dropdown-item" to="register">Signup</Link></li>}
    {!store.userDetail.login &&<li><hr className="dropdown-divider" /></li>}
    {store.userDetail.login &&<li onClick={handleLogout} ><Link className="dropdown-item" to="#">Logout</Link></li>}
    </ul>
</li>
<Link className="nav-link active" aria-current="page" to="/setting">Settings</Link>
 </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>

      
    </div>
  )
}

export default Navbar

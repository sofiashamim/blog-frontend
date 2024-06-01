import React from 'react'
import { useLocation } from 'react-router-dom'

const SinglePage = () => {

// const [, set] = useState();
let location= useLocation()

console.log(location)


  return (
    <div>
        <div className="card mb-3">
  <img src={location?.state?.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{location?.state?.title}</h5>
    <p className="card-text">Description: {location?.state?.description}</p>
    <p className="card-text"><small className="text-body-secondary">Author:{location?.state?.author?.name}</small></p>
  </div>
</div>

      
    </div>
  )
}

export default SinglePage

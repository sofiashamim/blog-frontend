import React from 'react'

const Sidebar = (props) => {
  return (
    <div>
      <button onClick={()=>props.setclicked(true)} className='mt-3 btn btn-info'>Create blog</button>
    </div>
  )
}

export default Sidebar

import React from 'react'
import {useNavigate} from 'react-router-dom'

function DirectoryItem({category}){
  const {route,id,title,url}=category
  const navigate=useNavigate()

  const onNavigate = ()=>{
    navigate(`/shop/${route}`)
  }
  return(
    <div onClick={onNavigate} key={id} className='directory-container'>
    <div className='background-image' style={{backgroundImage:`url(${url})`
  }}/>
    <div className='directory-body-container'>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
  </div>)
}

export default DirectoryItem
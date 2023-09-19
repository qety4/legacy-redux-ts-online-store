import React from 'react'
import '../directory-Item/directory-item.styles.scss'
import DirectoryItem from '../directory-Item/DirectoryItem.jsx'
import categories from './categoryInfo'

function Directory(){
return(
<div className='directories-container'>
{
categories.map((category)=>(
  <DirectoryItem key={category.id} category={category}/>
))
}
</div>
)
}

export default Directory
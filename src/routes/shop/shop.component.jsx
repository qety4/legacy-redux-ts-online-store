import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview'
import Category from '../category/category.componenet.jsx'
import './shop.styles.scss'
import { fetchCategoriesStart } from '../../store/categories/category.actions'

const Shop = () => {
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(fetchCategoriesStart())
    },[])

    return (
    
            <Routes>
                <Route index element={<CategoriesPreview />} />
                <Route path=':category' element={<Category />} />
            </Routes>
        
    )
}

export default Shop
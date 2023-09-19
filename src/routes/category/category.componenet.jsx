import { useState, useEffect } from 'react'
import './category.styles.scss'

import { useParams } from 'react-router-dom'

import ProductCard from '../../Components/product-card/product-card'
import { useSelector } from 'react-redux'
import { selectCategoriesLoading, selectCategoriesMap } from '../../store/categories/categories.selector'
import Spinner from '../../Components/spinner/spinner.component'

const Category = () => {
    const { category } = useParams()
    console.log('render/re-render category component')
    const categoriesMap  = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        console.log('effect calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
        {isLoading ?
        <Spinner/>
        :
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='unique-category-container'>
                {
                    products && products.map((item) => <ProductCard key={item.id} item={item} />)
                }

            </div>
        </>
        }   
        </>
    )


}

export default Category
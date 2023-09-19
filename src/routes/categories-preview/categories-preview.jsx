
import { useSelector } from 'react-redux'
import {selectCategoriesLoading, selectCategoriesMap} from '../../store/categories/categories.selector.js'
import CategoryPreview from '../../Components/category-preview/category-preview.jsx'
import Spinner from '../../Components/spinner/spinner.component.jsx'
const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesLoading)
    console.log(categoriesMap)
    return (
        <>
            {
                isLoading?
                <Spinner/>
                :
                Object.keys(categoriesMap)
                .map((title,index) =>{
                    const products= categoriesMap[title]
                    return <CategoryPreview key={index} title={title} products={products}/>
                })
            }
        </>
    )
}
export default CategoriesPreview
import './product-card.styles.scss'

import Button from '../button/button'
import { addToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({item})=>{
    const dispatch=useDispatch()
    const {id,imageUrl,name,price} = item
    const cartItems = useSelector(selectCartItems)

    const addProductToCart = ()=>{
        dispatch(addToCart(cartItems,item))
    }
    return( 
   <div className='product-card-container' key={id}>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button text='Add to cart' buttonType='inverted' 
        onClick={addProductToCart}
        />
    </div>
)};

export default ProductCard
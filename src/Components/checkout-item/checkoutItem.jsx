

import { useDispatch, useSelector } from 'react-redux'
import './checkoutItem.styles.scss'
import { addToCart, deleteItem, reduceQt } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const { imageUrl, name, quantity, price } = item
    const delItem = () => dispatch(deleteItem(cartItems,item))
    const addItem = () => dispatch(addToCart(cartItems,item))
    const removeItem = () => dispatch(reduceQt(cartItems,item))
    
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt="" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" 
                onClick={removeItem} 
                >
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" 
                onClick={addItem}
                >
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div 
            onClick={delItem} 
            className="remove-button">
                &#10005;
            </div>
        </div>)
}

export default CheckoutItem
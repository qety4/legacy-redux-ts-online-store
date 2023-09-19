

import { useSelector } from 'react-redux'
import CheckoutItem from '../../Components/checkout-item/checkoutItem.jsx'

import './checkout.styles.scss'
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector.js'

const CheckoutPage = ()=>{
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    Product
                </div>
                <div className="header-block">
                    Description
                </div>
                <div className="header-block">
                    Quantity
                </div>
                <div className="header-block">
                    Price
                </div>
                <div className="header-block">
                    Remove
                </div>
            </div>
            {
                cartItems.map((item)=>
                    <CheckoutItem key={item.id} item={item}/>
                )
            }
            <span className='total'>Total:$
            {cartTotal}
            </span>
        </div>
    )
}

export default CheckoutPage
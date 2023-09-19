import './cart.styles.scss'
import {ReactComponent as ShoppingIcon} from './shopping-bag.svg'

import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setCartOpen } from '../../store/cart/cart.action'

const Cart=()=>{
    const dispatch=useDispatch()
    const  isCartOpen = useSelector(selectIsCartOpen)
    const  cartCount = useSelector(selectCartCount)
    const toggleCartOpen = ()=> {
        let cartToggle= !isCartOpen
        dispatch(setCartOpen(cartToggle))
    }
    const total = cartCount
    return(
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{total}</span>
        </div>
    )
}

export default Cart
import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import './cart-dropdown.styles.scss'
import Button from '../button/button'
import CartItem from '../cart-item/cart-item'
import { useSelector } from 'react-redux'
import { selectCartCount, selectCartItems } from '../../store/cart/cart.selector'

const CartDropDown = () => {
  const cartItems  = useSelector(selectCartItems)
  const cartCount = useSelector(selectCartCount)
  const navigate=useNavigate();
  console.log(cartItems)
  const goToCheckoutHandler = ()=>{
    navigate('/checkout')
  }
  return (

    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartCount === 0 ? <span>No items in cart</span> 
        
        :
        cartItems?.map((item) => { return <CartItem key={item.id} cartItem={item} /> })
        
        }
      </div>
      
        <Button text='Go To Checkout' onClick={goToCheckoutHandler} />
      
    </div>
  )

}

export default CartDropDown
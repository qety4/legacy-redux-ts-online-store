import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { selectCurrentUser } from '../../store/user/user.selector.js'

import Cart from '../../Components/cart/cart.component.jsx'
import CartDropdown from '../../Components/cart-dropdown/cart-dropdown.component.jsx'
import { ReactComponent as Logo } from './logo.svg'
import './navigation.styles.scss'

import { selectIsCartOpen } from '../../store/cart/cart.selector.js'
import { signOutStart } from '../../store/user/user.action.js'



const Nav = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const signOutHandle = async () => {
        dispatch(signOutStart)
    }

    return (
        <>
            <div className='nav'>
                <Link className='nav-logo' to='/'>
                    <Logo className='logo' />
                </Link>

                <div className='nav-links'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <Link className='nav-link' to='/sign-in' onClick={signOutHandle}>
                                Sign Out
                            </Link>
                        ) : (
                            <Link className='nav-link' to='/sign-in'>
                                Sign In
                            </Link>
                        )
                    }

                    <div className='nav-link' >
                        <Cart />
                    </div>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </>
    )

}

export default Nav
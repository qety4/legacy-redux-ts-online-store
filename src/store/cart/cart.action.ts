import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducers.utils";
import { CategoryItem } from "../categories/category.types";


const addCartItem = (CartItems: CartItem[], item: CategoryItem): CartItem[] => {
    console.log(CartItems)
    const exists = CartItems.find(
        (cartItem) => cartItem.id === item.id
    );

    if (exists) {
        return CartItems.map(
            (cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...CartItems, { ...item, quantity: 1 }]
}


const removeCartItem = (CartItems: CartItem[], item: CategoryItem): CartItem[] => {
    const exists = CartItems.find(
        (cartItem) => cartItem.id === item.id
    );
    if (exists?.quantity === 1) {
        return CartItems.filter(cartItem => cartItem.id !== item.id)
    }
    return CartItems.map(
        (cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )

}


export type SetCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>


export const setCartOpen = withMatcher((bool: boolean) => createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool))


export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))



export const addToCart = (CartItems: CartItem[], item: CategoryItem) => {
    const newCart = addCartItem(CartItems, item)
    return setCartItems(newCart)
}

export const reduceQt = (CartItems: CartItem[], cartItem: CategoryItem) => {
    const newCart = removeCartItem(CartItems, cartItem)
    return setCartItems(newCart)

}

export const deleteItem = (CartItems: CartItem[], cartItem: CategoryItem) => {
    const newCart = CartItems.filter((item) => item.id !== cartItem.id)
    return setCartItems(newCart)

}

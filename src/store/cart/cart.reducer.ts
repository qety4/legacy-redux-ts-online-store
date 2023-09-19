import { AnyAction } from "redux";
import { CART_ACTION_TYPES } from "./cart.types";
import { setCartItems,setCartOpen } from "./cart.action"; 
import { CartItem } from "./cart.types";

export type CartState = {
    readonly isCartOpen: boolean,
    readonly cartItems:CartItem[]
}
export const CART_INITIAL_STATE:CartState = {
    isCartOpen: false,
    cartItems: [],
};



export const cartReducer = (state: CartState=CART_INITIAL_STATE , action:AnyAction):CartState => {
    // const { type, payload } = action

    if(setCartOpen.match(action)){
        return {
            ...state,
            isCartOpen: action.payload
        }

    }

    if(setCartItems.match(action)){
        return{
            ...state,
            cartItems:action.payload
        }
    }


    return state

    // switch (type) {
    //     case CART_ACTION_TYPES.SET_CART_ITEMS:
    //         return {
    //             ...state,
    //             cartItems:payload
    //         }
    //     case CART_ACTION_TYPES.SET_CART_OPEN:
    //         return {
    //             ...state,
    //             isCartOpen:payload
    //         }
    //     case CART_ACTION_TYPES.SET_CART_COUNT:
    //         return{
    //             ...state,
    //             cartCount:payload
    //         }
    //     case CART_ACTION_TYPES.SET_CART_TOTAL:
    //         return{
    //             ...state,
    //             cartTotal:payload
    //         }
    //     default:
    //         return state
    // }

}
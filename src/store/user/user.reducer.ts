import { AnyAction } from "redux"
import { USER_ACTION_TYPES, UserData } from "./user.types"
import { signInFailed, signInSuccess, signOutFailed, signOutSucces, signUpFailed, signUpStart } from "./user.action"
import { User } from "firebase/auth"

const USER_INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}
export type UserState = {
    readonly currentUser:UserData | null,
    readonly isLoading:boolean,
    readonly error:Error | null
}


export const userReducer = (state:UserState = USER_INITIAL_STATE, action: AnyAction) => {
    // const {type,payload} = action

    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }

    if(signOutSucces.match(action)){
        return{
            ...state,
            currentUser: null
        }
    }

    if(signUpFailed.match(action) || signInFailed.match(action) || signOutFailed.match(action)){

        return {
            ...state,
            error:action.payload
        }
    }

    return state
    // switch(type){
    //     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    //         return{
    //             ...state,
    //             currentUser:payload
    //         }
    //     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    //         return{
    //             ...state,
    //             currentUser:null
    //         }
    //     case USER_ACTION_TYPES.SIGN_UP_FAILED:
    //     case USER_ACTION_TYPES.SIGN_IN_FAILED:
    //     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    //         return{
    //             ...state,
    //             error:payload
    //         };

    //     default:
    //         return state
    // }
}
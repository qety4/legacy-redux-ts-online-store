import { AdditionalUserInfo, USER_ACTION_TYPES, UserData } from "./user.types.js";
import {createAction, withMatcher} from '../../utils/reducer/reducers.utils'

import { ActionWithPayload, Action } from "../../utils/reducer/reducers.utils";
import { User } from 'firebase/auth'

// SET_CURRENT_USER : 'user/SET_CURRENT_USER',
// CHECK_USER_SESSION:'user/CHECK_USER_SESSION',
// EMAIL_SIGN_IN_START:'user/EMAIL_SIGN_IN_START',
// GOOGLE_SIGN_IN_START:'user/GOOGLE_SIGN_IN_START',
// SIGN_IN_SUCCESS:'user/SIGN_IN_SUCCESS',
// SIGN_IN_FAILURE:'user/SIGN_IN_FAILURE',


export type CheckUserSession= Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export const checkUserSession =withMatcher(():CheckUserSession=>
createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))

export type SetCurrentUser= ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER,UserData>
export const setCurrentUser =withMatcher((user:UserData):SetCurrentUser=>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))

export type GoogleSignInStart= Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export const googleSignInStart = withMatcher(():GoogleSignInStart=>
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START))

export type EmailSignInStart= ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{email:string, password:string}>
export const emailSignInStart = withMatcher((email:string,password:string):EmailSignInStart=>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{email,password}))

    
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS,UserData>
export const signInSuccess = withMatcher((user:UserData & {id:string}):SignInSuccess=>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS,user))

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED,Error>
export const signInFailed = withMatcher((error:Error):SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED,error))


export type SignOutStart= Action<USER_ACTION_TYPES.SIGN_OUT_START>
export const signOutStart = withMatcher(():SignOutStart=>
    createAction(USER_ACTION_TYPES.SIGN_OUT_START))

export type SignOutSucces= Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>
export const signOutSucces = withMatcher(():SignOutSucces=>
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS))

export type SignOutFailed= ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED,Error>
export const signOutFailed = withMatcher((error:Error):SignOutFailed=>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED,error))
   

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START,{email:string, password:string,displayName:string}>
export const signUpStart = withMatcher((email:string,password:string,displayName:string):SignUpStart=>
    createAction(USER_ACTION_TYPES.SIGN_UP_START,{email,password,displayName}))

export type SignUpSuccess= ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user:User ,additionalDetails:AdditionalUserInfo}>
export const signUpSuccess = withMatcher((user:User,additionalDetails:AdditionalUserInfo):SignUpSuccess=>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user,additionalDetails}))

export type SignUpFailed= ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED,Error>
export const signUpFailed = withMatcher((error:Error):SignUpFailed=>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED,error));

import { takeLatest,put,all,call } from "typed-redux-saga/macro";
import { User } from 'firebase/auth'
import { createAuthUser, createUserDocumentFromAuth, getCurrentUser, signInWithEmail, signInWithGooglePopup,signOutUser,AdditionalUserInfo } from "../../utils/firebase/firebase";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSucces, EmailSignInStart, SignUpStart, SignUpSuccess } from "./user.action";


export function* getSnapshotFromUserAuth(userAuth: User ,additionalDetails?:AdditionalUserInfo){
try{
    const userSnapshot = yield* call(createUserDocumentFromAuth,userAuth,additionalDetails);
    if(userSnapshot)
        yield* put(signInSuccess({id: userSnapshot.id,...userSnapshot.data()}))
}catch(error){
    yield* put(signInFailed(error as Error))
}
}

export function* signInWithGoogle(){
    try{
       const { user }= yield* call(signInWithGooglePopup)
       yield* call(getSnapshotFromUserAuth,user)
    }catch(error){
        yield* put(signInFailed(error as Error));
    }
}
export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield* call(getCurrentUser)
        if(!userAuth)return
       yield* call(getSnapshotFromUserAuth,userAuth )
    }catch(error){
        yield* put(signInFailed(error as Error))
    }
}


export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGoogle)
}



export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,emailSignIn)
}


export function* emailSignIn({payload:{email,password}}: EmailSignInStart){
    try{
        const userCred = yield* call(signInWithEmail,email,password)
        if(userCred){
            const { user } = userCred
            yield* call(getSnapshotFromUserAuth,user)
        }
    }
    catch(error){
        yield* put(signInFailed(error as Error));
    }
}


export function* onSignUpStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START,signUp)
}


export function* signUp({payload:{ email, password , displayName }}: SignUpStart){
    try{
        const userCred = yield* call(createAuthUser,email,password)
        if(userCred){
            const { user } = userCred
            yield* put(signUpSuccess(user,{displayName}))
        }
    }
    catch(error){
        yield* put(signUpFailed(error as Error))
    }
}

export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* signInAfterSignUp({payload:{user,additionalDetails}}:SignUpSuccess){
    yield* call(getSnapshotFromUserAuth,user,additionalDetails)
}

export function* onSignOutStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}

export function* signOut(){
    try{
        yield* call(signOutUser)
        yield* put(signOutSucces())
    }
    catch(error){
        yield* put(signInFailed(error as Error));
    }
}

export function* userSagas(){
    yield* all([call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
}

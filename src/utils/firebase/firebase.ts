import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
    UserCredential
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'
import { Category, CategoryItem } from '../../store/categories/category.types';


const app = initializeApp({
    apiKey: "AIzaSyARr5cmMS0xP-z7VDGfjC9YjQ-OLh47J4k",
    authDomain: "e-shop-demo-dm.firebaseapp.com",
    projectId: "e-shop-demo-dm",
    storageBucket: "e-shop-demo-dm.appspot.com",
    messagingSenderId: "736641879895",
    appId: "1:736641879895:web:44e2b01447885aa667b812",

});


const provider = new GoogleAuthProvider()



export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


export const db = getFirestore()

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data()) as Category[]
}

export type AdditionalUserInfo = {
    displayName?: string
}
export type UserData = {
    createdAt: Date,
    displayName: string,
    email: string
}


export const createUserDocumentFromAuth = async (userAuth: User, additionalinformation: AdditionalUserInfo = {}): Promise<void | QueryDocumentSnapshot<UserData>> => {

    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);


    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth

        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalinformation
            })
        } catch (error) {
            console.log('error creating project', error)
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>
};


export const createAuthUser = async (email: string, password: string) => { //With Email and Password

    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)

}


export const signInWithEmail = async (email:string, password:string):Promise<UserCredential | void> => {
    if (!email && !password) return 
    const userCred = await signInWithEmailAndPassword(auth, email, password) 
    return userCred
}


export const signOutUser = async () => signOut(auth)



export const authStateListener = (callback: NextOrObserver<User>) => {
    if (!callback) return
    onAuthStateChanged(auth, callback)
}



export const getCurrentUser = ():Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}


export const addCollectionAndDocuments = async (collectionKey:string, objToAdd:Array<Object>) => { //adding object to database collection 
    const collectionRef = collection(db, collectionKey)
    const bacth = writeBatch(db)

    objToAdd.forEach((obj:any) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase())
        bacth.set(docRef, obj);
    });

    await bacth.commit()
    console.log("done")
}
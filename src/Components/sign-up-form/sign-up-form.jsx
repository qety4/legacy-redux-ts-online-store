import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { createAuthUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase'

import FormInput from '../form-input/form-input.jsx'

import Button from '../../Components/button/button.jsx'



import './sign-up.styles.scss'
import { signUpStart } from '../../store/user/user.action'

const defaultFormFields={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm=()=>{
    const dispatch= useDispatch()

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    
    const resetForm = (defaultForm)=>{
        setFormFields(defaultForm)
    }

    const submit= async(event)=>{
        event.preventDefault()
        console.log(event)
        if(password === confirmPassword){
            try{
            dispatch(signUpStart(email,password,displayName))
            
            }catch(error){
                if (error.code === 'auth/email-already-in-use'){
                    alert('Cannot create user, email already used')
                }else{
                    console.log('user creation error',error)  
                }
            }
            finally{
            resetForm(defaultFormFields)
            }
        }
        else{
            alert('password did not match')
        }
    }


    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
    return(
        <div className='sign-up-container'>
            <h2>I do not Have an Account</h2>
            <span>Sign UP With Your Email and Password</span>
            <form onSubmit={(event)=>{submit(event)}}>
                
                <FormInput 
                label='Display Name' 
                htmlFor='displayName'
                id='displayName'
                type='text'
                required
                onChange={handleChange} 
                name='displayName'
                value={displayName}
                />

                
                <FormInput
                label='Email'
                htmlFor='email'
                id='email'
                type="email" 
                required 
                onChange={handleChange} 
                name='email'
                value={email}
                />

                <FormInput
                label='Password'
                htmlFor="password"
                id='password'
                type="password" 
                required 
                onChange={handleChange}
                name='password'
                value={password}
                />

                <FormInput
                label='Confirm Password'
                htmlFor='confirmPassword'
                id='confirmPassword'
                type="password" 
                required
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
                />

                <Button text='Sign Up' buttonType="inverted" type='submit'/>
            </form>
        </div>
    )
}

//check the object for password

export default SignUpForm
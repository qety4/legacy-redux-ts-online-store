import { useState} from 'react'
import FormInput from '../form-input/form-input.jsx'
import Button from '../../Components/button/button.jsx'
import { useDispatch } from 'react-redux'
import { googleSignInStart,emailSignInStart } from '../../store/user/user.action.js'


const defaultFormFields={
    email:"",
    password:"",
}

const SignIn = () => {
    const dispatch=useDispatch();
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields


    const googleSignIn = async () => {
        dispatch(googleSignInStart())
    }

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    const submit = async (e)=>{
        e.preventDefault()
        try{
           dispatch(emailSignInStart(email,password))   
        }
        catch(e){
            switch(e.code){
            case 'auth/wrong-password': 
            alert('incorrect password for email')
            break
            case 'auth/user-not-found': 
            alert('user not found')
            break
            }

            console.log('error',e)
        }
    }
    return (
        <div className='sign-up-container'>
            <h2>I already have an account</h2>
            <p>Sign in with your email and password</p>
            <form onSubmit={(e)=>{submit(e)}}>
            <FormInput
                label='email'
                htmlFor='emailsignin'
                id='emailsignin'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
            />
            <FormInput
                label='password'
                htmlFor='passwordsignin'
                id='passwordsignin'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
            />
            <div >
            <Button
                text='Sign In'
                buttonType='inverted'
                type='submit'
            />
            <Button
                text='Sign in with Google'
                onClick={googleSignIn}
                buttonType='google'
                type='button'
            />
            </div>
            </form>
           
            
        </div>
    )
}

export default SignIn
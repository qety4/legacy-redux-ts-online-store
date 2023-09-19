
import SignUpForm from '../../Components/sign-up-form/sign-up-form.jsx'

import SignInForm from '../../Components/sign-in/sign-in-form.jsx'

import './signin.styles.scss'

const SignIn = () => {

    return (
        <div className='signin-container'>
            <SignInForm/>
            <SignUpForm />
        </div>
    )
}

export default SignIn
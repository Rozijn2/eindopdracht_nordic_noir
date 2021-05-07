import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';
import {useForm} from 'react-hook-form';
import './page5.css'
import Nordic_noir5 from '../assets/ nordic_noir5.jpg'



function Login () {
    const [registrationFormStatus, setRegistrationFormStatus] = useState(false);

    const loginProps = useSpring({
        left: registrationFormStatus ? -550:0
    })

    const registerProps = useSpring({
        left: registrationFormStatus ? 0:550
    })

    const loginBtnProps = useSpring({
        borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px darkblue'
    })

    const registerBtnProps = useSpring({
        borderBottom: registrationFormStatus ? 'solid 2px darkblue' : 'solid 0px transparent'
    })

    function registerClicked() {setRegistrationFormStatus(true)}
    function loginClicked() {setRegistrationFormStatus(false)}

    const {handleSubmit, register} = useForm();

    function onFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <img src={Nordic_noir5} alt="Nordic-scene"/>


            <div className="container">
                <div className="login-register-wrapper">
                    <div className="nav-buttons">
                        <animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>Login</animated.button>
                        <animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>Register</animated.button>
                    </div>
                    <div className="form-group">
                        <animated.form onSubmit={handleSubmit(onFormSubmit)} action="" id="loginform" style={loginProps}><LoginForm /></animated.form>
                        <animated.form onSubmit={handleSubmit(onFormSubmit)} action="" id="registerform" style={registerProps}><RegisterForm /></animated.form>
                    </div>
                    <animated.div className="forgot-panel" style={loginProps}>Forgot password?</animated.div>
                </div>
            </div>
        </>
    );
}

function LoginForm() {
    return (
        <React.Fragment>
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username"/>
            <label htmlFor="password">PASSWORD</label>
            <input type="text" id="password"/>
            <input type="submit" value="submit" className="submit"/>
        </React.Fragment>
    )
}

function RegisterForm() {
    return (
        <React.Fragment>
            <label htmlFor="fullname">full name</label>
            <input type="text" id="fullname"/>
            <label htmlFor="email">email</label>
            <input type="text" id="email"/>
            <label htmlFor="password">password</label>
            <input type="text" id="password"/>
            <label htmlFor="confirmpassword">confirm password</label>
            <input type="text" id="confirmpassword"/>
            <input type="submit" value="submit" className="submit"/>
        </React.Fragment>
    )
}

export default Login;
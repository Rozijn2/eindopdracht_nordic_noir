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

    const {handleSubmit} = useForm();

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
    const {register} = useForm();

    return (
        <React.Fragment>
            <label htmlFor="username">USERNAME</label>
            <input
                   type="input"
                   id="username"
                   name="username"
                   {...register('userName', {
                    required: {
                        value: true,
                        message: "Usernaam verplicht"
                    },
                })}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
                type="password"
                id="password"
                {...register('password', {
                    required: {
                        value: true,
                        message: "Password verplicht"
                    },
                })}
            />
            <button type="submit" value="submit" className="submit">Submit</button>
        </React.Fragment>
    )
}

function RegisterForm() {
    const {register} = useForm();
    return (
        <React.Fragment>
            <label htmlFor="fullname">full name</label>
            <input type="text"
                   id="fullname"
                   {...register('fullName', {
                   required: {
                       value: true
                   },
                   })}
            />
            <label htmlFor="email">email</label>
            <input type="email"
                   id="email"
                   {...register('email', {
                       required: {
                          value: true
                       },
                   })}
            />
            <label htmlFor="password">password</label>
            <input type="password"
                   id="passWord"
                   {...register('passWord', {
                       required: {
                           value: true
                       },
                   })}
            />
            <label htmlFor="confirmpassword">confirm password</label>
            <input type="password"
                   id="confirmpassword"
                   {...register('confirmpassword', {
                       required: {
                           value: true
                       },
                   })}
            />
            <button type="submit" value="submit" className="submit">Submit</button>
        </React.Fragment>
    )
}

export default Login;
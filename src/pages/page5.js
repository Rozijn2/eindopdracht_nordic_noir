import React, {useState, useRef} from 'react';
import {useSpring, animated} from 'react-spring';
import {useForm} from 'react-hook-form';
import './page5.css'
import Nordic_noir5 from '../assets/ nordic_noir5.jpg'


function Login () {
    const [registrationFormStatus, setRegistrationFormStatus] = useState(false);


    const loginBtnProps = useSpring({
        borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px darkblue'
    })

    const registerBtnProps = useSpring({
        borderBottom: registrationFormStatus ? 'solid 2px darkblue' : 'solid 0px transparent'
    })

    function registerClicked() {setRegistrationFormStatus(true)}
    function loginClicked() {setRegistrationFormStatus(false)}

    const {handleSubmit, formState: { errors }} = useForm();

    const forgetProps = useSpring( {
        left: registrationFormStatus ? -550:0
    })

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
                      <LoginForm registrationFormStatus={registrationFormStatus}/>
                      <RegisterForm registrationFormStatus={registrationFormStatus}/>
                    </div>
                    <animated.div className="forgot-panel" style={forgetProps}>Forgot password?</animated.div>
                </div>
            </div>
        </>
    );
}

function LoginForm({registrationFormStatus}) {
    const {handleSubmit, register, formState: {errors}} = useForm();

    const loginProps = useSpring({
        left: registrationFormStatus ? -550:0
    })

    function onLoginFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <animated.form onSubmit={handleSubmit(onLoginFormSubmit)}
                           action=""
                           id="loginform"
                           style={loginProps}
                           >
            <label htmlFor="name">USERNAME</label>
            <input
                   type="input"
                   id="name"
                   name="name"
                   {...register('name', {
                    required: {
                        value: true,
                        message: "Usernaam verplicht"
                    },
                })}
            />
                {errors.name && <p>{errors.name.message}</p>}
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
                 {errors.password && <p>{errors.password.message}</p>}
            <input type="submit" value="submit" className="submit"/>
            </animated.form>
        </>
    )
}

function RegisterForm({registrationFormStatus}) {
    const {handleSubmit, register, formState: { errors }, watch} = useForm();

    const password2 = useRef({});
    password2.current = watch("password2", "");

    function onRegisterFormSubmit(data) {
        console.log(data);
    }

    const registerProps = useSpring({
        left: registrationFormStatus ? 0:550
    })

    return (
        <>
            <animated.form onSubmit={handleSubmit(onRegisterFormSubmit)}
                   action=""
                   id="registerform"
                   style={registerProps}
                   >
            <label htmlFor="fullname">full name</label>
            <input type="text"
                   id="fullname"
                   {...register('fullname', {
                   required: {
                       value: true,
                       message: "Aub u volledig naam invullen"
                   },
                   })}
                     />
                {errors.fullname && <p>{errors.fullname.message}</p>}
            <label htmlFor="email">email</label>
            <input type="email"
                   id="email"
                   {...register('email', {
                       required: "Email is verplicht",
                       pattern: {
                           value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                           message: "Aub geldig email"
                       },
                   })}
            />
                {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor="password2">password</label>
            <input type="password"
                   id="password2"
                   {...register('password2', {
                       required: "Password verplicht",
                       minLength: {
                           value:8,
                           message: "Password minimaal 8 tekens"
                       }
                       },
                   )}
            />
                {errors.password2 && <p>{errors.password2.message}</p>}
            <label htmlFor="confirmpassword">confirm password</label>
            <input type="password"
                   id="confirmpassword"
                   {...register('confirmpassword', {
                      validate: value =>
                          value === password2.current || "The passwords do not match"
                       },
                   )}
            />
                {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
            <input type="submit" value="submit" className="submit"/>
            </animated.form>
        </>
   )
}

export default Login;
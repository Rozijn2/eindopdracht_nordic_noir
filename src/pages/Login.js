import React, {useState, useRef, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import {useForm} from 'react-hook-form';
import { useHistory } from "react-router-dom";
import './Login.css'
import Nordic_noir5 from '../assets/ nordic_noir5.jpg'
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import rollingGif from "../assets/Rolling-1s-200px.gif";


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

    //const {handleSubmit, formState: { errors }} = useForm();

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
                    <animated.div className="forgot-panel" style={forgetProps}>Password vergeten?</animated.div>
                </div>
            </div>
        </>
    );
}

function LoginForm({registrationFormStatus}) {
    const {handleSubmit, register, formState: {errors}} = useForm();
    const [registerLoginSuccess, toggleRegisterLoginSuccess] = useState(false);
    const [errorLoginMessage, toggleErrorLoginMessage] = useState(false);
    const [loadingLogin, toggleLoadingLogin] = useState(false);
    const { login } = useContext(AuthContext);
    let history = useHistory();
    const loginProps = useSpring({
        left: registrationFormStatus ? -550:0
    })

 async function onLoginFormSubmit(data) {
        console.log(data);
        toggleErrorLoginMessage(false);
        toggleLoadingLogin(true);

        try{
            const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signin', data);

            if(result.status === 200) {
              localStorage.setItem('token', result.data.accessToken);
                login(result.data.accessToken);
                toggleRegisterLoginSuccess(true);
                // history.push('/home')
                }
              console.log(result);


        }catch(e) {
            console.error(e)
            toggleErrorLoginMessage(true);
        }
        toggleLoadingLogin(false);
    }

    return (
        <>
            <animated.form onSubmit={handleSubmit(onLoginFormSubmit)}
                           action=""
                           id="loginform"
                           style={loginProps}
                           >
            <label htmlFor="username">USERNAAM</label>
            <input
                   type="input"
                   id="username"
                   name="username"
                   {...register('username', {
                    required: {
                        value: true,
                        message: "Usernaam verplicht"
                    },
                })}
            />
                {errors.username && <p>{errors.username.message}</p>}
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
                      {registerLoginSuccess === true && <p>Login is gelukt!</p>}
                        {errorLoginMessage && <p>Login mislukt! Probeer later nog een keer.</p>}
                            {loadingLogin && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
            </animated.form>
        </>
    )
}

function RegisterForm({registrationFormStatus}) {
    const {handleSubmit, register, formState: { errors }, watch} = useForm();
    const [registerSuccess, toggleRegisterSuccess] = useState(false);


    const password = useRef({});
    password.current = watch("password", "");

  async function onRegisterFormSubmit(data) {
        console.log(data);
      try{
          const result = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signup',{
              username: data.name,
              email: data.email,
              password: data.password,
              role: ['user'],
          });
          console.log(result);
          toggleRegisterSuccess (true);

      }catch(e) {
          console.error(e)
      }
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
            <label htmlFor="name">USERNAAM</label>
            <input type="text"
                   id="name"
                   {...register('name', {
                   required: {
                       value: true,
                       message: "Usernaam verplicht"
                   },
                   })}
                     />
                {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor="email">EMAIL</label>
            <input type="email"
                   id="email"
                   {...register('email', {
                       required: "Email verplicht",
                       pattern: {
                           value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                           message: "Aub geldig email"
                       },
                   })}
            />
                {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor="password">PASSWORD</label>
            <input type="password"
                   id="password"
                   {...register('password', {
                       required: "Password verplicht",
                       minLength: {
                           value:8,
                           message: "Password minimaal 8 tekens"
                       }
                       },
                   )}
            />
                {errors.password && <p className="must-have">{errors.password.message}</p>}
            <label htmlFor="confirmpassword">CONFIRM PASSWORD</label>
            <input type="password"
                   id="confirmpassword"
                   {...register('confirmpassword', {
                      validate: value =>
                          value === password.current || "The passwords do not match"
                       },
                   )}
            />
                {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
            <input type="submit" value="submit" className="submit"/>
                {registerSuccess === true && <p>Registreren is gelukt!</p>}
            </animated.form>
        </>
   )
}

export default Login;
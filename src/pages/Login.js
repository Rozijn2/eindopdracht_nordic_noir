import React, {useState, useRef, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import {useForm} from 'react-hook-form';
import './Login.css';
import Nordic_noir5 from '../assets/ nordic_noir5.jpg';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import rollingGif from '../assets/Rolling-1s-200px.gif';
import InputField from '../components/InputField';

function Login() {
    const [registrationFormStatus, setRegistrationFormStatus] = useState(false);


    const loginBtnProps = useSpring({
        borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px darkblue'
    })

    const registerBtnProps = useSpring({
        borderBottom: registrationFormStatus ? 'solid 2px darkblue' : 'solid 0px transparent'
    })

    function registerClicked() {setRegistrationFormStatus(true)}
    function loginClicked() {setRegistrationFormStatus(false)}

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
                <section>
                    <InputField
                   label="username"
                   type="input"
                   id="username"
                   name="username"
                   fieldRef={register('username', {
                    required: "Usernaam verplicht"
                    })}
                   >
                       USERNAAM
                   </InputField>
                   {errors.username && <p>{errors.username.message}</p>}
                </section>

                <section>
                   <InputField
                   label="password"
                   type="password"
                   id="password"
                   fieldRef={register('password', {
                    required: "Password verplicht"
                   })}
                   >
                   PASSWORD
                   </InputField>
                 {errors.password && <p>{errors.password.message}</p>}
                </section>

                   <input type="submit" value="submit" className="submit"/>
                      {registerLoginSuccess === true && <p className="other-colour">Login is gelukt!</p>}
                          {errorLoginMessage && <p>Login mislukt! Probeer later nog een keer.</p>}
                            {loadingLogin && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
            </animated.form>
        </>
    )
}

function RegisterForm({registrationFormStatus}) {
    const {handleSubmit, register, formState: { errors }, watch} = useForm();
    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const [errorRegisterMessage, toggleErrorRegisterMessage] = useState(false);
    const [loadingLogin, toggleLoadingLogin] = useState(false);

    const password = useRef({});
    password.current = watch("password", "");

  async function onRegisterFormSubmit(data) {
        console.log(data);
      toggleErrorRegisterMessage(false);
      toggleLoadingLogin(true);
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
          toggleErrorRegisterMessage(true);
      }
      toggleLoadingLogin(false);
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

                <section>
                    <InputField
                        label="name"
                        type="input"
                        id="name"
                        name="name"
                        fieldRef={register('name', {
                            required: "Usernaam verplicht"
                        })}
                     >
                     USERNAAM
                    </InputField>
                    {errors.name && <p>{errors.name.message}</p>}
                </section>

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

                <section>
                    <InputField
                        label="password"
                        type="password"
                        id="password"
                        fieldRef={register('password', {
                            required: "Password verplicht",
                            minLength: 8,
                            message: "Password minimaal 8 tekens"
                        })}
                    >
                        PASSWORD
                    </InputField>
                    {errors.password && <p className="must-have">{errors.password.message}</p>}
                </section>

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
                {registerSuccess === true && <p className="other-colour">Registreren is gelukt!</p>}
                {errorRegisterMessage && <p>Login mislukt! Probeer later nog een keer.</p>}
                {loadingLogin && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
            </animated.form>
        </>
   )
}

export default Login;
import React, {createContext, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useHistory} from "react-router-dom";



export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    });

    let history = useHistory();


    async function fetchUserData(jwtToken) {
        console.log(jwtToken);
        const decoded = jwt_decode(jwtToken)
        const userId = decoded.sub;

        try {
            const result = await axios.get(`https://polar-lake-14365.herokuapp.com/api/user`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            console.log(result);
            setAuthState( {
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
                isLogout: false,
            });
            history.push('/home')

        } catch(e) {
            console.error(e);
            logoutFunction();
        }
    }

useEffect(() => {
    const token = localStorage.getItem('token');

    if ( token && authState.user === null) {

        fetchUserData(token);

    } else {
        setAuthState({
        user: null,
        status: "done",
        });
}
}, []);

 async function loginFunction(jwtToken) {

     localStorage.setItem('token', jwtToken);

     fetchUserData(jwtToken);

    }

    function logoutFunction() {
        console.log("Log Uit!")
        localStorage.clear();
        setAuthState ({
            user: null,
            status: "done",
            }
            )
        history.push('/login')
    }

    const data = {
        ...authState,
        login: loginFunction,
        logout: logoutFunction,
    }

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'done'
            ? children
            : <p>Loading...</p>
            }
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;
import React, {createContext, useState} from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import App from "../App";



export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
    });
 async function loginFunction(jwtToken) {
        console.log(jwtToken);

        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        console.log("DECODED JWT:", decoded);

        localStorage.setItem('token', jwtToken);
        //console.log(result.data.accessToken);

     try {
         const result = await axios.get(`https://polar-lake-14365.herokuapp.com/api/user/${userId}`,{
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
             }
             })

     } catch(e) {
         console.error(e);
     }
    }

    function logoutFunction() {
        console.log("Log Uit!")
    }

    const data = {
        ...authState,
        login: loginFunction,
        logout: logoutFunction,
    }

    return (
        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>

    );
}


export default AuthContextProvider;
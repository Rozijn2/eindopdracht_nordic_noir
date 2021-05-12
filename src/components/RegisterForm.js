import React from 'react';
import {useForm} from 'react-hook-form';


function Register ({name, type, text}) {
   return(
       <>
           <label htmlFor={name}>{text}</label>
           <input
               type={type}
               id={name}
           />
       </>

   );
}

export default Register
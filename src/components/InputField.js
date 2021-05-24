import React from 'react';



function InputField({ name, children, type, fieldRef }) {
      return(
            <>
              <label
                htmlFor={name}
              >
               {children}
              </label>
            <input
              type={type}
              id={name}
              name={name}
              {...fieldRef}
              />
              </>
      );
}

export default InputField
import React from 'react';



function InputField({ name, children, type, fieldRef }) {
      return(
            <article>
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
              </article>
      );
}

export default InputField
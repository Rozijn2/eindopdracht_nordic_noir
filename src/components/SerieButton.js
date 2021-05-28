import React from 'react';
import './SerieButton.css';

const STYLES = ["button-one", "button-one-bottom1", "button-one-bottom2",]


function Button({ disabled, buttonStyle, type, onClick, children }) {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    return (
        <button
            disabled={disabled}
            className={`${checkButtonStyle}`}
            type={type}
            onClick={onClick}
          >
    {children}
    </button>
    );
}

export default Button
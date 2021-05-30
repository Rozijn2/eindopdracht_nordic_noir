import React from 'react';
import './Title.css';


function Title({text1, text2}) {
    return(
        <>
        <h1>{text1}</h1>
        <h1>{text2}</h1>
            </>
    );
}

export default Title;
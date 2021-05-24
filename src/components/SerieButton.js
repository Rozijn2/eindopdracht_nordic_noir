import React from 'react';


function SerieButton({children, type, onClick }) {

    return (
        <button
            disabled={};
            className={"button-one"};
            type={type};
            onClick={onClick}
          >
    {children}
    </button>
    );
}

export default SerieButton
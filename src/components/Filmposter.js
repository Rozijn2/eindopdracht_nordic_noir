import React, { useState } from 'react';
import './Filmposter.css';


function Filmposter ({imgurl, title, details}) {
    const [isShown, setIsShown] = useState(false);

    return (
        <li onClick={() => setIsShown(prevIsShown => !prevIsShown)}
        > <div className="list-box" >
            {isShown ? (
                <span className= "poster">
                    <h2 className="serie-title">{title}</h2>
                        <p className="serie-details">{details}</p>
                </span>
            ):(<img className="poster" src={imgurl} alt="Filmposter"/>)}
        </div>
        </li>
    );
}

export default Filmposter
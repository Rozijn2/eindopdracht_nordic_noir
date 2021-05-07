import React, { useState } from 'react';
import './Filmposter.css'



const Filmposter = ({imgurl, title, details})=> {
    //const [flip, setFlip] = useState(false);//
    const [isShown, setIsShown] = useState(false);

    return (

        <li onClick={() => setIsShown(prevIsShown => !prevIsShown)}

        > <div className="list-box" >
        {/*{flip ? imgurl : title}*/}

            {isShown ? (
                <span className= "poster">

                        <h2>{title}</h2>
                        <p>{details}</p>

                </span>
            ):(<img className="poster" src={imgurl} alt="Filmposter"/>)}
        </div>
        </li>




    );
}

export default Filmposter
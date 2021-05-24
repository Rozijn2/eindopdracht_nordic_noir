import React, { useState, useContext } from 'react';
import './Filmposter.css'
import {AuthContext} from "../context/AuthContext";



const Filmposter = ({imgurl, title, details, id})=> {
    //const [flip, setFlip] = useState(false);//
    const [isShown, setIsShown] = useState(false);
    const {user} = useContext(AuthContext);

    function addToMyFavorite(id) {
        let favorite = localStorage.getItem(user.id) ;
        console.log(favorite);
        localStorage.setItem(user.id, favorite ? JSON.stringify(favorite.push(id)):JSON.stringify([id]) );
    }


    return (

        <li onClick={() => setIsShown(prevIsShown => !prevIsShown)}

        > <div className="list-box" >
        {/*{flip ? imgurl : title}*/}

            {isShown ? (
                <span className= "poster">

                        <h2 className="serie-title">{title}</h2>
                        <p className="serie-details">{details}</p>
                    {user === null | !user
                        ?
                        <></>
                        :
                        <button name="button" onClick={() =>addToMyFavorite(id)}>Add to list</button>
                    }
                </span>
            ):(<img className="poster" src={imgurl} alt="Filmposter"/>)}
        </div>
        </li>




    );
}

export default Filmposter
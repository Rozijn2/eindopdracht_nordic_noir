import React, { useState } from 'react';
import './page4.css'
import Nordic_noir4 from '../assets/ nordic-noir4.jpg'



function Search ({setSerieHandler}) {
    const {query, setQuery} = useState('');

    function handleClick(){
        setSerieHandler(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setSerieHandler(query);
        }
    }

    return (
        <>
            <img src={Nordic_noir4} alt="Nordic-scene"/>
            <span className="searchbar">
            <input
                type="text"
                name="search"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder="Zoek een serie"
                />

                <button
                    type="button"
                    onClick={handleClick}
                    >
                    Search
                </button>
                </span>
        </>
    );
}

export default Search;
import React, {useState} from 'react';



function SearchBar({setSerieHandler}) {
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
            <span className="searchbar">
            <input
                type="text"
                name="search"
                value={query}
                onKeyDown={keyPressCheck}
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

export default SearchBar
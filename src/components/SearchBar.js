import React, {useState} from 'react';
import './SearchBar.css';
import Button from './Button';

function SearchBar({setSerieHandler}) {
    const [query, setQuery] = useState('');

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
            <span>
            <input className="search-field"
                type="text"
                name="search"
                value={query}
                onKeyDown={keyPressCheck}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder="Zoek een serie"
            />
              <Button
                    className="search-button"
                    type="button"
                    onClick={handleClick}
              >
                    Zoek
              </Button>
                </span>
        </>
    );
}

export default SearchBar;
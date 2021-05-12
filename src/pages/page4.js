import React, {useEffect, useState} from 'react';
import './page4.css'
import Nordic_noir4 from '../assets/ nordic-noir4.jpg'
import SearchBar from "../components/SearchBar";
import axios from "axios";




function SearchPage () {
    const [serie, setSerie] = useState('');

    useEffect(() => {
      async function fetchUnogsData() {
          try {
              const response = await axios.get('https://unogsng.p.rapidapi.com/search', {
                  params: {
                      // netflixid: '2696',
                      genrelist: '76802',
                      //limit: 20,
                      // offset:page*20
                  },
                  headers: {
                      'x-rapidapi-key': '19bafe1b09msh1c688e857bf674cp1268f5jsn84eebba0713d',
                      'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                  }
              });
              setSerie(response.data.results);
              console.log(response.data.results);

          } catch (e) {
              console.error(e);
          }

      }

      fetchUnogsData();
  }, [])


    return (
        <>
            <img src={Nordic_noir4} alt="Nordic-scene"/>
            <div className="search-container">
                <SearchBar setSerieHandler={setSerie}/>

            </div>

       </>
    );
}

export default SearchPage
import React, {useEffect, useState} from 'react';
import './Search.css'
import Nordic_noir4 from '../assets/ nordic-noir4.jpg'
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Filmposter from "../components/Filmposter";
import Title from "../components/Title";




function SearchPage () {
    const [serie, setSerie] = useState('');
    const [list, setList ] = useState([]);

    useEffect(() => {
      async function fetchUnogsData(serie) {
          try {
              const response = await axios.get('https://unogsng.p.rapidapi.com/search', {
                  params: {
                      // netflixid: '2696',
                      genrelist: '76802',
                      //limit: 20,
                      // offset:page*20
                      query: serie
                  },
                  headers: {
                      'x-rapidapi-key': ' ',
                      'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                  }
              });
              setList
              (response.data.results);
              console.log(response.data.results);

          } catch (e) {
              console.error(e);
          }

      }
      if(serie){
          fetchUnogsData(serie);
      }
      }, [serie])


    return (
        <>
            <img src={Nordic_noir4} alt="Nordic-scene"/>
            <div className="search-box">
              <article className="title-box">
                <Title
                  text1="Nordic"
                  text2="Noir"
                />
              </article>
                <div className="search-container">
                   <SearchBar setSerieHandler={setSerie}/>
                      <ul className="poster-list">
                         {list && list.map((serie) => {
                            return <Filmposter imgurl={serie.img} title={serie.title} details={serie.synopsis}/>
                         })}
                      </ul>
                </div>
            </div>
        </>
    );
}

export default SearchPage
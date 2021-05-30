import React, {useEffect, useState} from 'react';
import './Search.css';
import Nordic_noir4 from '../assets/ nordic-noir4.jpg';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import Filmposter from '../components/Filmposter';
import Title from '../components/Title';
import rollingGif from '../assets/Rolling-1s-200px.gif';

function SearchPage () {
    const [serie, setSerie] = useState('');
    const [list, setList ] = useState([]);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
      async function fetchUnogsData(serie) {
          setError('');
          toggleLoading(true);
          try {
              const response = await axios.get('https://unogsng.p.rapidapi.com/search', {
                  params: {
                      genrelist: '76802',
                      query: serie
                  },
                  headers: {
                      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                      'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                  }
              });
              setList
              (response.data.results);
              console.log(response.data.results);

          } catch (e) {
              setError('Er is iets fout gegaan tijdens het ophalen van de data. Ververs de pagina aub.')
              console.error(e);
          }
          toggleLoading(false);

      }
      if(serie){
          fetchUnogsData(serie);
      }
      }, [serie])

    return (
        <>
            <img src={Nordic_noir4} alt="Nordic-scene"/>
            <div className="search-box">
                {error && <p>{error}</p>}
              <article className="title-box">
                <Title
                  text1="Nordic"
                  text2="Noir"
                />
              </article>
                <section className="button-box">
                   <SearchBar setSerieHandler={setSerie}/>
                     </section>
                      {loading && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
                         <section className="poster-container">
                      <ul className="poster-list">
                         {list && list.map((serie) => {
                            return <Filmposter imgurl={serie.img} title={serie.title} details={serie.synopsis}/>
                         })}
                      </ul>
                </section>
            </div>
        </>
    );
}

export default SearchPage;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Films.css'
import Nordic_noir3 from '../assets/ nordic_noir3.jpg';
import rollingGif from '../assets/Rolling-1s-200px.gif';
import Filmposter from '../components/Filmposter';
import Title from '../components/Title';
import Button from '../components/Button';



function Series () {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(0);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);


    useEffect(() => {
        async function fetchUnogsData() {
            setError('');
            toggleLoading(true);

            try{
                const response = await axios.get('https://unogsng.p.rapidapi.com/search', {
                    params: {
                        genrelist: '69192',
                        limit: 20,
                        offset:page*20
                    },
                    headers: {
                        'x-rapidapi-key':  process.env.REACT_APP_RAPID_API_KEY,
                        'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                    }
                });
                setSeries(response.data.results);
                console.log(response.data.results);

            }catch(e){
                setError('Er is iets fout gegaan tijdens het ophalen van de data. Ververs de pagina aub.')
                console.error(e);
            }
            toggleLoading(false);
        }
        fetchUnogsData();
    },[page])

    return (
        <>
            <img src={Nordic_noir3} alt="Nordic-scene"/>
              <section>
                {error && <p>{error}</p>}
                  <article>
                    <Title
                        text1="Nordic"
                        text2="Noir"
                    />
                </article>
                  <h4>Scandinavische films</h4>
                    <section className="button-box">
                      <Button type="button" disabled={page === 0} className="button-one" onClick={() => setPage(page-1)}>Previous</Button>
                      <Button type="button" disabled={page > 78} className="button-one" onClick={()=>setPage(page+1)}>Next</Button>
                    </section>
                  {loading && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
                      <section className="poster-container">
                        <ul className="poster-list">
                          {series && series.map((serie) => {
                              return <Filmposter key={serie.id} imgurl={serie.img} title={serie.title} details={serie.synopsis} id={serie.id}/>
                        })}
                        <Button type="button" disabled={page === 0} className="button-one" onClick={() => setPage(page-1)}>Previous</Button>
                        <Button type="button" disabled={page > 78} className="button-one" onClick={()=>setPage(page+1)}>Next</Button>
                    </ul>
                </section>
            </section>
        </>
    );
}

export default Series;
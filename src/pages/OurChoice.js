import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './OurChoice.css'
import Nordic_noir7 from '../assets/nordic_noir7.jpg';
import rollingGif from '../assets/Rolling-1s-200px.gif';
import Filmposter from '../components/Filmposter';
import Title from '../components/Title';
import Button from '../components/Button';

function Series () {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());

    useEffect(() => {
        async function fetchUnogsData() {
            setError('');
            toggleLoading(true);

            try{
                const response = await axios.get('https://unogsng.p.rapidapi.com/search', {
                    params: {
                        genrelist: '76802',
                    },
                    headers: {
                        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                        'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                    }
                });

                let seriesLength = response.data.results.length;
                  let randomSeries = Math.floor(Math.random() * seriesLength);
                    setSeries([response.data.results[randomSeries]]);
                console.log(response.data.results);

            }catch(e){
                setError('Er is iets fout gegaan tijdens het ophalen van de data. Ververs de pagina aub.')
                console.error(e);
            }
            toggleLoading(false);
        }
        fetchUnogsData();
    },[random])

    return (
        <>
            <img src={Nordic_noir7} alt="Nordic-scene"/>
              <div className="random-box">
                  {error && <p>{error}</p>}
                <article className="title-box">
                    <Title
                        text1="Nordic"
                        text2="Noir"
                    />
                </article>
                  <div className="random-container">
                  <section className="button-box">
                    <Button className="button-one" onClick={reRender}>Onze keus</Button>
                       </section>
                  {loading && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
                    <section className="poster-container">
                      <ul className="poster-list">
                        {series && series.map((serie) => {
                            return <Filmposter imgurl={serie.img} title={serie.title} details={serie.synopsis} id={serie.id}/>
                        })}
                      </ul>
                </section>
              </div>
            </div>
        </>
    );
}

export default Series;
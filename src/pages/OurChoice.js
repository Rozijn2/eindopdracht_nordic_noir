import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './OurChoice.css'
import Nordic_noir7 from "../assets/nordic_noir7.jpg"
import rollingGif from "../assets/Rolling-1s-200px.gif";
import Filmposter from "../components/Filmposter";
import Title from "../components/Title";



function Series () {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(0);
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
                        // netflixid: '2696',
                        genrelist: '76802',
                        limit: 20,
                        offset:page*20
                    },
                    headers: {
                        'x-rapidapi-key':' ',
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
            {/*<div className="container">*/}
            <img src={Nordic_noir7} alt="Nordic-scene"/>
            <section>
                <article>
                    <Title
                        text1="Nordic"
                        text2="Noir"
                    />
                </article>
                <section className="button-box">
                    <button className="button-one" onClick={reRender}>Random choice</button>

                    <button disabled={page < 78} className="button-one" onClick={()=>setPage(page+1)}>Next</button>
                </section>
                {loading && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
                <section className="poster-container">
                    <ul className="poster-list">
                        {series && series.map((serie) => {
                            return <Filmposter imgurl={serie.img} title={serie.title} details={serie.synopsis} id={serie.id}/>
                        })}
                        <button disabled={page === 0} className="button-one-bottom1" onClick={()=>setPage(page-1)}>Previous</button>
                        <button disabled={page > 78} className="button-one-bottom2" onClick={()=>setPage(page+1)}>Next</button>
                    </ul>
                </section>
            </section>
            {/*</div>*/}
        </>
    );
}

export default Series;
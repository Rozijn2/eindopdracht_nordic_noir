import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Films.css'
import Nordic_noir3 from '../assets/ nordic_noir3.jpg';
import rollingGif from "../assets/Rolling-1s-200px.gif";
import Filmposter from "../components/Filmposter";
import Title from "../components/Title";



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
                        // netflixid: '2696',
                        genrelist: '69192',
                        limit: 20,
                        offset:page*20
                    },
                    headers: {
                        'x-rapidapi-key':' ',
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
            {/*<div className="container">*/}
            <img src={Nordic_noir3} alt="Nordic-scene"/>
            <section>
                <article>
                    <Title
                        text1="Nordic"
                        text2="Noir"
                    />
                </article>
                <section className="button-box">
                    <button disabled={page === 0} className="button-one" onClick={()=>setPage(page-1)}>Previous</button>
                    <button disabled={page > 78} className="button-one" onClick={()=>setPage(page+1)}>Next</button>
                </section>
                {loading && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
                <section className="poster-container">
                    <ul className="poster-list">
                        {series && series.map((serie) => {
                            return <Filmposter imgurl={serie.img} title={serie.title} details={serie.synopsis} id={serie.id}/>
                        })}
                        <button disabled={page > 78} className="button-one-bottom1" onClick={()=>setPage(page-1)}>Previous</button>
                        <button disabled={page === 0} className="button-one-bottom2" onClick={()=>setPage(page+1)}>Next</button>
                    </ul>
                </section>
            </section>
            {/*</div>*/}
        </>
    );
}

export default Series;
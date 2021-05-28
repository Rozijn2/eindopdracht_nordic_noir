import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Serie.css'
import Nordic_noir2 from '../assets/ nordic_noir2.jpg';
import rollingGif from "../assets/Rolling-1s-200px.gif";
import Filmposter from "../components/Filmposter";
import Title from "../components/Title";
import Button from "../components/SerieButton";



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
                        genrelist: '76802',
                        limit: 20,
                        offset:page*20
                    },
                    headers: {
                        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
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
            <img src={Nordic_noir2} alt="Nordic-scene"/>
            <section>
                <article>
                <Title
                text1="Nordic"
                text2="Noir"
                />
                </article>
                <section className="button-box">
                <Button type="button" className="button-one" disabled={page === 0} onClick={() => setPage(page-1)}>Vorige</Button>
                <Button type="button" className="button-one-bottom1" disabled={page === 3} onClick={()=>setPage(page+1)}>Volgende</Button>
                </section>
                {loading && <img className="giphy" src={rollingGif} alt="rolling-gif"/>}
                <section className="poster-container">
                    <ul className="poster-list">
                  {series && series.map((serie) => {
                        return <Filmposter key={serie.id} imgurl={serie.img} title={serie.title} details={serie.synopsis} id={serie.id}/>
                    })}
                        <Button type="button" className="button-one-bottom1" onClick={()=>setPage(page-1)}>Vorige</Button>
                        <button type="button" className="button-one-bottom2" onClick={()=>setPage(page+1)}>Volgende</button>
                    </ul>
                </section>
            </section>
            {/*</div>*/}
        </>
    );
}

export default Series;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './page2.css'
import Nordic_noir2 from '../assets/ nordic_noir2.jpg';
import Filmposter from "../components/Filmposter";



function Series () {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        async function fetchUnogsData() {
            try{
                const response = await axios.get('https://unogsng.p.rapidapi.com/search', {
                    params: {
                        // netflixid: '2696',
                        genrelist: '76802',
                        limit: 20,
                        offset:page*20
                    },
                    headers: {
                        'x-rapidapi-key':"",
                        'x-rapidapi-host': 'unogsng.p.rapidapi.com',
                    }
                });
                setSeries(response.data.results);
                console.log(response.data.results);

            }catch(e){
                console.error(e);
            }

        }
        fetchUnogsData();
    },[page])

    return (
        <div className="container">
            <img src={Nordic_noir2} alt="Nordic-scene"/>
            <section>
                <h1>Nordic</h1>
                <h1>Noir</h1>
                <section className="button-box">
                <button className="button-one" onClick={()=>setPage(page+1)}>Next</button>
                <button className="button-one" onClick={()=>setPage(page-1)}>Previous</button>
                </section>
                <section className="poster-container">
              <ul className="poster-list">
                  {series && series.map((serie) => {
                        return <Filmposter imgurl={serie.img} title={serie.title} details={serie.synopsis}/>
                    })}
              </ul>
                </section>
            </section>

            <button className="button-one" onClick={()=>setPage(page+1)}>Next</button>
            <button className="button-one" onClick={()=>setPage(page-1)}>Previous</button>

        </div>


    );
}

export default Series;
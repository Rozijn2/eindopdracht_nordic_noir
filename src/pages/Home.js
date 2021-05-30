import React from 'react';
import './Home.css';
import Nordic_noir1 from '../assets/ nordic_noir1.jpg';
import { NavLink } from 'react-router-dom';
import Title from "../components/Title";


function Home () {
    return (
        <>
            <img src={Nordic_noir1} alt="Nordic-scene"/>
            <Title
                text1="Nordic"
                text2="Noir"
            />
            <article className="text-box">
             <p className="noir-text">Nordic Noir is de verzamelnaam voor misdaadfictie, die zich afspeelt in Scandinavie. De naam Nordic Noir, dat ook wel
             Scandinavian Noir wordt genoemd, is in de jaren negentig ontstaan toen Scandinavische misdaadboeken steeds populairder
             werden,mede dankzij de boeken van de Zweedse schrijver Henning Mankell over inspecteur Kurt Wallander en tientallen
             andere auteurs uit Denemarken, Noorwegen, Zweden, Finland en IJsland. Nordic Noir groeide vervolgens ook uit tot een immens
             populair genre voor film of tv-series, met als bekende voorbeelden de Deense politieserie, The Killing en daarna de Deens
                 /Zweedse serie, The Bridge.</p>
             <h3 className="login-link">Klik <NavLink to="/login"> hier</NavLink> voor inloggen of registreren</h3>
         </article>
        </>
    );
}

export default Home;
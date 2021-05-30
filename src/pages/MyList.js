import React from 'react';
import './MyList.css'
import Nordic_noir6 from '../assets/ nordic_noir6.jpg'
import Title from '../components/Title';



function MyList () {
    return (
        <>
            <img src={Nordic_noir6} alt="Nordic-scene"/>
              <div className="mylist-box">
               <article className="title-box">
                <Title
                    text1="Nordic"
                    text2="Noir"
                 />
               </article>
                <div className="mylist-container">
                    <h1>My List</h1>
                </div>
            </div>
        </>
    );
}

export default MyList;
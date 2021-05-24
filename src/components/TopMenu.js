import React, {useState, useContext} from 'react';
import {NavLink, Link} from 'react-router-dom';
import './TopMenu.css';
import WhiteIcon from '../assets/pngaaa.com-2275920.png'
import Icon from '../assets/659803-200.png';
import Cross from '../assets/noun_X_2289976.png';
import {AuthContext} from '../context/AuthContext';
import { useHistory } from 'react-router-dom';


function TopMenu() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const {logout, user, status, isLogout} = useContext(AuthContext);


    console.log(isLogout);

    return (

         <>

                 <div className="navbar">
                     <Link to="#" className="menu-bars">
                         <img src={WhiteIcon} alt="icon" className="icon" onClick={showSidebar}/>
                     </Link>
                     <span className="navbar-span">SEARCH</span>
                 </div>

                 <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                     <ul className="nav-menu-items" onClick={showSidebar}>

                         <li className="navbar-toggle">
                             <Link to="#" className="menu-bars">
                                 <img src={Cross} alt="cross" className="icon"/>
                             </Link>
                         </li>

                         <li className="nav-text">
                             <NavLink to="/home" className="sliding-link">Home</NavLink>
                         </li>
                         <li className="nav-text">
                             <NavLink to="/series" className="sliding-link">Series</NavLink>
                         </li>
                         <li className="nav-text">
                             <NavLink to="/films" className="sliding-link">Films</NavLink>
                         </li>
                         <li className="nav-text">
                             <NavLink to="/ourchoice" className="sliding-link">Onze keus</NavLink>
                         </li>
                         <li className="nav-text">
                             <NavLink to="/search" className="sliding-link">Search</NavLink>
                         </li>
                         {user === null | !user
                             ?
                             <li className="nav-text">
                                 <NavLink to="/login" className="sliding-link">Login</NavLink>
                             </li>

                             :
                             <>
                             <li className="nav-text">
                                 <NavLink to="/mylist" className="sliding-link">MyList</NavLink>
                             </li>
                             <li>
                             <button type="button" className="navbar-button" onClick={logout}>
                             Uitloggen
                             </button>
                             </li>
                             </>
                         }

                     </ul>
                 </nav>

        </>

    );
}

export default TopMenu;
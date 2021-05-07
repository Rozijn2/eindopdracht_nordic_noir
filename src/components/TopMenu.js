import React, {useState} from 'react';
import {NavLink, Link} from "react-router-dom";
import './TopMenu.css';
import Icon from '../assets/659803-200.png';
import Cross from "../assets/noun_X_2289976.png";


function TopMenu() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <img src={Icon} alt="icon" className="icon" onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <img src={Cross} alt="cross" className="icon"/>
                        </Link>
                    </li>
                    <li className="nav-text">
                        <NavLink to="/home" className="link-item">Home</NavLink>
                    </li>
                    <li className="nav-text">
                        <NavLink to="/series" activeClassName="active-link">Series</NavLink>
                    </li>
                    <li className="nav-text">
                        <NavLink to="/films" activeClassName="active-link">Films</NavLink>
                    </li>
                    <li className="nav-text">
                        <NavLink to="/search" activeClassName="active-link">Search</NavLink>
                    </li>
                    <li className="nav-text">
                        <NavLink to="/login" activeClassName="active-link">Login</NavLink>
                    </li>
                    <li className="nav-text">
                        <NavLink to="/mylist" activeClassName="active-link">MyList</NavLink>
                    </li>
                </ul>
            </nav>
            </>

    );
}

export default TopMenu;
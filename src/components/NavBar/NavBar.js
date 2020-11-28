import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";

import LogIn from "../pages/LogIn"

import '../css/NavBar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return(
            <nav className="NavBarItems">
                
                <div className="menu-icon">

                </div>
                <ul className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                    <div className="socialIcons">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </ul>
                <div className="signInUpButtons">
                    <Link to="/signup" className="signUpButton">회원가입</Link>
                    <Link to="/login" className="signInButton">로그인</Link>
                </div>
                
            </nav>
                
        )
    }
}

export default NavBar
import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import '../css/NavBar.css';

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
                    <a className="signUpButton">회원가입</a>
                    <a className="signInButton">로그인</a>
                </div>
                
            </nav>
                
        )
    }
}

export default NavBar
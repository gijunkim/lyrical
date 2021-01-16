import React, { Component } from "react";
import { MenuItems } from "./MenuItems";

import AuthService from "../../services/auth.service";

import "../../styles/NavBar.css";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <nav className="NavBarItems">
        <div className="menu-icon"></div>
        <ul className="nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <HashLink to={item.url} className={item.cName}>
                  {item.title}
                </HashLink>
              </li>
            );
          })}
          <div className="socialIcons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </ul>

        {currentUser ? (
          <div className="signInUpButtons">
            <Link to="/profile" className="signUpButton">
              Hello, {currentUser.user.nickname}!
            </Link>
            <a href="/login" className="signInButton" onClick={this.logOut}>
              로그아웃
            </a>
          </div>
        ) : (
          <div className="signInUpButtons">
            <Link to="/signup" className="signUpButton">
              회원가입
            </Link>
            <Link to="/login" className="signInButton">
              로그인
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default NavBar;

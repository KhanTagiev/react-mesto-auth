import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import headerLogo from '../images/header-logo.svg';

function Header({loggedIn, userEmail, onSignOut}) {
  const location = useLocation();
  const isLocationSignIn = location.pathname === "/sign-in";
  const isLocationMain = location.pathname === "/";

  function onSignIn () {

  }


  return (
    <header className="header page_section-container">
        <img className="header__logo" src={headerLogo} alt="Место Россия" />
        <nav className='header__links-container'>
          <p className="header__user-email">{loggedIn ? userEmail : ""}</p>
          {!isLocationSignIn ? (
            <NavLink onClick={loggedIn ? onSignOut : onSignIn} className={`header__link ${ isLocationMain ? "header__link_place_main" : ""}`}
              to={"/sign-in"}
            >
              {loggedIn ? "Выйти" : "Войти"}
            </NavLink>
          ) : (
            <NavLink className="header__link" activeClassName="header_nav-item_active" to={"/sign-up"}>
              {!loggedIn ? "Регистрация" : ""}
            </NavLink>
          )}
        </nav>
    </header>
  )
}

export default Header
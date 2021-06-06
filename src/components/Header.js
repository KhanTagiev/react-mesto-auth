import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import headerLogo from '../images/header-logo.svg';

function Header({loggedIn, userEmail, onSignOut}) {
  return (
    <header className="header page_section-container">
        <img className="header__logo" src={headerLogo} alt="Место Россия" />
        <nav className='header__links-container'>
          <Switch>
          <Route exact path="/">
            <p className="header__user-email">{loggedIn ? userEmail : ""}</p>
            <NavLink onClick={onSignOut} className="header__link header__link_place_main" to={"/sign-in"}>Выйти</NavLink>
          </Route>
          <Route path="/sign-in">
            <NavLink className="header__link" activeClassName="header_nav-item_active" to={"/sign-up"}>Регистрация</NavLink>
          </Route>
          <Route path="/sign-up">
            <NavLink className="header__link" activeClassName="header_nav-item_active" to={"/sign-in"}>Войти</NavLink>
          </Route>
          </Switch>
        </nav>
    </header>
  )
}

export default Header
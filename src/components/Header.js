import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

function Header({
  isOpen,
  onNavOpen,
  onClose,
  loggedIn,
  userEmail,
  onSignOut,
}) {
  return (
    <Switch>
      <Route exact path="/">
        <header className="header page_section-container header_auth-container">
          <nav
            className={`header__links-container header__links-container_closed ${
              isOpen ? "header__links-container_opened" : ""
            }`}
          >
            <p className="header__user-email">{loggedIn ? userEmail : ""}</p>
            <NavLink
              onClick={onSignOut}
              className="header__link header__link_place_main"
              to={"/sign-in"}
            >
              Выйти
            </NavLink>
          </nav>
          <div className="header__menu-container">
            <img className="header__logo" src={headerLogo} alt="Место Россия" />
            <button
              className="header__btn-container"
              type="button"
              aria-label="Открыть меню"
              onClick={isOpen ? onClose : onNavOpen}
            >
              <span
                className={`header__btn ${isOpen ? "header__btn_active" : ""}`}
              ></span>
            </button>
          </div>
        </header>
      </Route>
      <Route path="/sign-in">
        <header className="header page_section-container">
          <img className="header__logo" src={headerLogo} alt="Место Россия" />
          <nav className="header__links-container">
            <NavLink
              className="header__link"
              activeClassName="header_nav-item_active"
              to={"/sign-up"}
            >
              Регистрация
            </NavLink>
          </nav>
        </header>
      </Route>
      <Route path="/sign-up">
        <header className="header page_section-container">
          <img className="header__logo" src={headerLogo} alt="Место Россия" />
          <nav className="header__links-container">
            <NavLink
              className="header__link"
              activeClassName="header_nav-item_active"
              to={"/sign-in"}
            >
              Войти
            </NavLink>
          </nav>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;

// import React from 'react';
// import { Route, Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({loggedIn}) {
  return (
    <header className="header page_section-container">
        <img className="header__logo" src={headerLogo} alt="Место Россия" />
        <div className='header__links-container'>
            <p className='header__link'> {loggedIn? 'Регистрация' : 'Войти'}</p>
        {/* <Route path='/signup'>
          <Link className='header__link' to='/signin'>
            Войти
          </Link>
        </Route>
        <Route path='/signin'>
          <Link className='header__link' to='/signup'>
            Регистрация
          </Link>
        </Route>
        <Route exact path='/'>
          <Link className='header__link' to='/signin'>
            Выйти
          </Link>
        </Route> */}
      </div>
    </header>
  )
}

export default Header
import React from "react";
import logo from "../images/logo.svg";
import { Link, withRouter, useLocation } from "react-router-dom";
import Info from "./Info";

function Header(props) {

  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {props.loggedIn ?
        <Info email={props.email} loggedIn={props.loggedIn} onSignOut={props.onSignOut} /> :
        (<>
          {
            location.pathname === '/sign-up' ? 
            <Link className='header__link' to='/sign-in'>Регистрация</Link> :
            <Link className='header__link' to='/sign-up'>Войти</Link>
          }
        </>)
      }
    </header>
  );
}

export default withRouter(Header);
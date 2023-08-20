import React from "react";
import { Link } from "react-router-dom";

function Info(props) {
  
  return (
    <div className='header__info'>
      <p className='header__email'>{props.email}</p>
      <Link className={`header__link ${props.loggedIn && 'header__link_active'}`} to='sign-up' onClick={props.onSignOut}>Выйти</Link>
    </div>
  )
}

export default Info;
import React from "react";
import { Link } from "react-router-dom";

function AuthPage (props) {

  return (
    <div className="page-auth">
      <form className="page-auth__form" name={props.formName} onSubmit={props.onSubmit}>
        <h2 className="page-auth__title">{props.title}</h2>
          {props.children}
        <button type="submit" className="page-auth__button">{props.buttonText}</button>
        {props.formName === 'register' && <Link className='page-auth__link' to='/sign-up'>Уже зарегистрированы? Войти</Link>}
      </form>
    </div>
  )
}

export default AuthPage;
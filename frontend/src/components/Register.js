import React, { useState } from "react";
import AuthPage from "./AuthPage";

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  function handleChange(e) {
    const {value} = e.target;
    e.target.name === 'Email' ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(password, email);
  }
 
  return (
    <div className="register">
      <AuthPage formName="register" title="Регистрация" onSubmit={handleSubmit} buttonText="Зарегистрироваться">
        <input name="Email" type="email" className="popup__input popup__input_type_login" id="email" placeholder="Email" minLength="6" maxLength="40" required value={email || ''} onChange={handleChange}/>
        <input name="Password" type="password" className="popup__input popup__input_type_login" id="password" placeholder="Пароль" minLength="6" maxLength="40" required value={password || ''} onChange={handleChange}/>
      </AuthPage>
    </div>
  )
}

export default Register;
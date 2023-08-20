import React from "react";

function PopupWithForm(props) {

  return (
    <article className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close popup__close_profile" onClick={props.onClose}></button>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
            {props.children}
          <button type="submit" className="popup__button" >{props.buttonText}</button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;



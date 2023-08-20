import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="Фото профиля" src={currentUser.avatar} />
          <button className="profile__button profile__button_actions_avatar button" type="button" onClick={props.onEditAvatar} ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__profession">{currentUser.about}</p>
          <button className="profile__button profile__button_actions_edit button" type="button" onClick={props.onEditProfile} ></button>
        </div>
        <button className="profile__button profile__button_actions_add button" type="button" onClick={props.onAddPlace} ></button>
      </section>
      <section className="cards">
        <ul className="card">
          {props.cards.map((card) => {return <Card key={card._id} _id={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>})}
        </ul>
      </section>
    </main>
  );
}

export default Main;
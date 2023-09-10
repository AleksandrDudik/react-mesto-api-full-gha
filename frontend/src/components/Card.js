import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_active' : ''}`;

  return (
    <li className="card__template">
      {isOwn && (<button className="card__delete" type="button" onClick={handleDeleteClick}></button>)}
      <img className="card__image" alt={props.card.name} src={props.card.link} onClick={handleCardClick} />
      <div className="card__container">
        <h2 className="card__city">{props.card.name}</h2>
        <div className="card__like_container">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="card__like_count">{props.card.likes.length}</span>
        </div>
      </div>  
    </li>
  );
}

export default Card;
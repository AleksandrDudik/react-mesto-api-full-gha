import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {api} from "../utils/Api";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default App;

function App() {

  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getApiUserInfo(), api.getCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => alert(err));
  }, []);

  function handleAddPlaceSubmit(cardData) {
    api.postCards(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api.setAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api.setApiUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {setCards(cards.filter((item) => item !== card))})
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c));})
      .catch((err) => console.log(err));
  }

  const isOpen = isAvatarPopupOpen || isProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  React.useEffect(() => {

    function handleCloseByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleCloseByOverlay(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    if(isOpen) {
      document.addEventListener('keydown', handleCloseByEscape);
      document.addEventListener('mousedown', handleCloseByOverlay);
      return () => {
        document.removeEventListener('keydown', handleCloseByEscape);
        document.removeEventListener('mousedown', handleCloseByOverlay);
      }
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} onClose={closeAllPopups} cards={cards} selectedCard={selectedCard} />
        <Footer />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm name="form-confirm" title="Вы уверены?" buttonText="Да" />
      </div>
    </CurrentUserContext.Provider>
  );
}
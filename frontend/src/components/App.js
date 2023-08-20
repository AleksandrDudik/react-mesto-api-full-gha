import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
import success from "../images/success.svg";
import failure from "../images/failure.svg";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

export default App;

function App() {

  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();
  const [message, setMessage] = React.useState({ img: '', text: '' });

  React.useEffect(() => {
    if ( loggedIn ) {
      Promise.all([api.getApiUserInfo({ token: localStorage.jwt }), api.getCards({ token: localStorage.jwt })])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

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
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {setCards((cards) => cards.filter((item) => item !== card))})
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c));})
      .catch((err) => console.log(err));
  }

  const isOpen = isAvatarPopupOpen || isProfilePopupOpen || isAddPlacePopupOpen || isInfoTooltipOpen || selectedCard;

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

  function handleAuth(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/');
        setEmail(email);
      })
      .catch((err) => {
        if (err.status === 400) {
          setMessage({ img: failure, text: 'Не передано одно из полей'});
        } else if (err.status === 401) {
          setMessage({ img: failure, text: `Пользователь с email ${email} не найден`});
        } else {
          setMessage({ img: failure, text: 'Что-то пошло не так! Попробуйте ещё раз'});
        }
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleRegistration(password, email) {
    auth.register(password, email)
      .then((res) => {
        setEmail(res.data.email);
        setMessage({ img: success, text: 'Вы успешно зарегистрировались!' });
        history.push('/sign-in');
      })
      .catch(() => setMessage({ img: failure, text: 'Некорректно заполнено одно из полей' }))
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-up');
    setLoggedIn(false);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} 
            onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} selectedCard={selectedCard} cards={cards} />
          <Route path='/sign-up'>
            <Login isOpen={isProfilePopupOpen} onAuth={handleAuth} />
          </Route>
          <Route path='/sign-in'>
            <Register isOpen={isProfilePopupOpen} onRegister={handleRegistration} isInfoTooltipOpen={isInfoTooltipOpen} />
          </Route>
          <Route path='/'>
            <Login isOpen={isProfilePopupOpen} onAuth={handleAuth} />
          </Route>
        </Switch>
        <Footer />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm name="form-confirm" title="Вы уверены?" buttonText="Да" />
        <InfoTooltip name='tooltip' isOpen={isInfoTooltipOpen} onClose={closeAllPopups} img={message.img} title={message.text} />
      </div>
    </CurrentUserContext.Provider>
  );
}
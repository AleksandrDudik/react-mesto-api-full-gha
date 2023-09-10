import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState("Жак-Ив Кусто");
  const [about, setDescription] = React.useState("Исследователь");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name, 
      about: about,
    })
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="popupformprofile" title="Редактировать профиль" buttonText="Сохранить"
      children={<>
        <label className="popup__field">
          <input type="text" id="name" name="name" maxLength="40" minLength="2" placeholder="Имя" autoComplete="off" required className="popup__input popup__input_type_name" value={name || ''}  onChange={handleNameChange} />
          <span className="popup__error name-error">Ошибка</span>
        </label>
        <label className="popup__field">
          <input type="text" id="about" name="about" maxLength="200" minLength="2" placeholder="Профессия" autoComplete="off" required className="popup__input popup__input_type_job" value={about || ''}  onChange={handleDescriptionChange} />
          <span className="popup__error about-error">Ошибка</span>
        </label></>
      }/>
  );
}

export default EditProfilePopup;
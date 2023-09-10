import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarReference = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarReference.current.value,
    })
  }

  React.useEffect(() => {
    return () => {
      avatarReference.current.value = "";
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="popupformavatar" title="Обновить аватар" buttonText="Сохранить"
      children={
        <label className="popup__field">
          <input type="url" id="avatar" name="avatar" placeholder="Ссылка на картинку" required autoComplete="off" ref={avatarReference} className="popup__input popup__input_type_avatar" />
          <span className="popup__error avatar-error">Ошибка</span>
        </label>}/>
  )
}

export default EditAvatarPopup;
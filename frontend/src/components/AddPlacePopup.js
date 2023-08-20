import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleCityChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    return () => {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="form-info" title="Новое место" buttonText="Создать" 
      children={<>
        <label className="popup__field">
          <input type="text" id="city" name="name" minLength="2" maxLength="30" placeholder="Название" className="popup__input popup__input_type_city" value={name} autoComplete="off" required onChange={handleCityChange} />
          <span className="popup__error city-error">Ошибка</span>
        </label>
        <label className="popup__field">
          <input type="url" id="link" name="link" placeholder="Ссылка на картинку" className="popup__input  popup__input_type_link" value={link} autoComplete="off" required onChange={handleLinkChange} />
          <span className="popup__error link-error">Ошибка</span>
        </label></>
      }/>
  );
}

export default AddPlacePopup;
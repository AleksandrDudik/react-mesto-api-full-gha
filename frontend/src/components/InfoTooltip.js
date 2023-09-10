import React from "react";

function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className='popup__container-wrap'>
          <img src={props.img} alt={props.img} className='popup__tooltip' />
          <h2 className="popup__title_type_tooltip">{props.title}</h2>
        </div>
        <button type="button" className="popup__close" onClick={props.onClose}></button>
      </div>  
    </div>
  )
}

export default InfoTooltip;
import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    }, handleInputsClean)
  }

  function handleInputsClean() {
    setName("")
    setLink("")
  }

  return (
    <PopupWithForm title='Новое место' name='photo-card' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
                   buttonText='Создать'>
      <label className="form__label">
        <input className="form__input form__input_site" value={name} type="text" placeholder="Название"
               name="photo-card-site" minLength="2" maxLength="30" required onChange={handleChangeName}/>
        <span className="form__input-error photo-card-site-error"></span>
      </label>
      <label className="form__label">
        <input className="form__input form__input_url" value={link} type="url" placeholder="Ссылка на картинку"
               name="photo-card-url" required onChange={handleChangeLink}/>
        <span className="form__input-error photo-card-url-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup

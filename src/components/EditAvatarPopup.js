import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm title='Обновить аватар' name='avatar' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <label className="form__label">
        <input ref={avatarRef} className="form__input form__input_avatar" type="url" placeholder="Ссылка на аватар" name="avatar-url" required />
        <span className="form__input-error avatar-url-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
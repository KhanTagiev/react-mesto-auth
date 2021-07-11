import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({ isOpen,card, onClose, onDeleteCard }) {

  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard(card);
  }

  return (
    <PopupWithForm title='Вы уверены?' name='photo-card-delete' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Да'>
    </PopupWithForm>
  )
}

export default DeleteCardPopup

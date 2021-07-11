import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike ,onCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile page_section-container">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          <span className="profile__avatar-hover"></span>
        </div>
        <div className="profile__info">
          <div className="profile__name-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__btn profile__btn_edit" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__btn profile__btn_add" type="button" aria-label="Добавить фотографию" onClick={onAddPlace}></button>
      </section>
      <section className="photo-cards page_section-container">
        <ul className="photo-cards__container">
           {cards.map((card) => (<Card key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} card={card} />))}
        </ul>
      </section>
    </main>
  )
}

export default Main

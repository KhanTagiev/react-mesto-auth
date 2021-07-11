import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(true, card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardClick(false, card);
    onCardDelete()
  }

  return (
    <li className="photo-card">
      <figure className="photo-card__container">
        <img className="photo-card__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <figcaption className="photo-card__info">
          <h2 className="photo-card__name">{card.name}</h2>
          <div className="photo-card__like-container">
            <button className={`photo-card__btn photo-card__btn_like  ${isLiked ? "photo-card__btn_like_active" : ""}`}
                    type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
            <p className="photo-card__like-counter">{card.likes.length}</p>
          </div>
        </figcaption>
        <button className={`photo-card__btn photo-card__btn_delete ${isOwn ? "photo-card__btn_delete_visible" : ""}`}
                type="button" aria-label="Удалить фотографию" onClick={handleDeleteClick}></button>
      </figure>
    </li>
  )
}

export default Card

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_photo-view ${card.isClicked ? 'popup_opened': ''}`}>
      <div className="popup__container popup__container_photo-view">
        <figure className="photo-view">
          <img src={card.url} alt={card.name} className="photo-view__image" />
          <figcaption className="photo-view__info">
            <h2 className="photo-view__name">{card.name}</h2>
          </figcaption>
        </figure>
       <button className="popup__btn popup__btn_close" type="button" aria-label="Закрыть окно добавления места" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default ImagePopup
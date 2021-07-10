import Popup from './Popup.js';

function ImagePopup({card, onClose}) {
  return (
    <Popup name={'photo-view'} isOpen={card.isClicked} onClose={onClose}>
      <figure className="photo-view">
        <img src={card.url} alt={card.name} className="photo-view__image"/>
        <figcaption className="photo-view__info">
          <h2 className="photo-view__name">{card.name}</h2>
        </figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup

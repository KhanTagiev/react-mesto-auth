import React from 'react';

function Popup({name, isOpen, onClose, children}) {

  function closeClickPopup(evt) {
    if (evt.target.classList.contains('popup__btn_close') || evt.target.classList.contains('popup')) {
      onClose()
      document.removeEventListener('click', closeClickPopup)
      document.removeEventListener('keydown', closeKeyPopup)
    }
  }

  function closeKeyPopup(evt) {
    if (evt.key === "Escape") {
      onClose()
      document.removeEventListener('click', closeClickPopup)
      document.removeEventListener('keydown', closeKeyPopup)
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeClickPopup)
      document.addEventListener('keydown', closeKeyPopup)
    }

  }, [isOpen]);

  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_${name}`}>
        {children}
        <button className="popup__btn popup__btn_close" type="button" aria-label="Закрыть окно добавления места"
                onClick={onClose}></button>
      </div>
    </section>
  )
}

export default Popup

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, buttonText, children }) {

  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={`${name}-info`} noValidate onSubmit={onSubmit}>
          <fieldset className={`form__fieldset form__fieldset_${name}`}>
            {children}
            <button className="form__btn form__btn_save" type="submit" aria-label="Сохранить">{buttonText}</button>
          </fieldset>
        </form>
        <button className="popup__btn popup__btn_close" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default PopupWithForm
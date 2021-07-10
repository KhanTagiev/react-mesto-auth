import Popup from './Popup.js';

function PopupWithForm({name, title, isOpen, onClose, onSubmit, buttonText, children}) {

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="form" name={`${name}-info`} noValidate onSubmit={onSubmit}>
        <fieldset className={`form__fieldset form__fieldset_${name}`}>
          {children}
          <button className="form__btn form__btn_save" type="submit" aria-label="Сохранить">{buttonText}</button>
        </fieldset>
      </form>
    </Popup>
  )
}

export default PopupWithForm

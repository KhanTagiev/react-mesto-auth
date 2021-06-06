import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoTooltip({isOpen, onClose, status}) {

  return (
    <section className={`popup popup_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_place_info-tooltip">
        <img className="popup__info-image" src={status ? success : error} alt={status ? "Успешно" : "Ошибка"} />
        <p className="popup__info-text">{status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button className="popup__btn popup__btn_close" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default InfoTooltip
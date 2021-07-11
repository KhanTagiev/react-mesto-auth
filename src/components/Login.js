import React from 'react';
import {withRouter} from "react-router-dom";
import {formAuthSelector, validateSelectors} from "../utils/constants";
import FormValidator from "../utils/formValidator";

function Login({handleLogin}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    const authFormValidator = new FormValidator(validateSelectors, document.querySelector(formAuthSelector).querySelector('.form'));
    ;
    authFormValidator.enableValidation()
  }, [])


  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return
    }

    handleLogin(email, password)
  }

  return (
    <main>
      <section className="auth page_section-container">
        <h1 className="auth__title">Вход</h1>
        <form className="form" name="login" onSubmit={handleSubmit} noValidate>
          <fieldset className="form__fieldset form__fieldset_place_auth">
            <label className="form__label">
              <input className="form__input form__input_email form__input_place_auth" type="email" value={email}
                     placeholder="Email" name="auth-email" minLength="2" maxLength="40" required
                     onChange={handleChangeEmail}/>
              <span className="form__input-error auth-email-error"></span>
            </label>
            <label className="form__label">
              <input className="form__input form__input_about form__input_place_auth" type="password" value={password}
                     placeholder="Пароль" name="auth-password" minLength="8" maxLength="200" required
                     pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                     title="Используйте большие и маленькие буквы, добавьте цифры."
                     onChange={handleChangePassword}/>
              <span className="form__input-error auth-password-error"></span>
            </label>
            <button className="form__btn form__btn_save form__btn_place_auth form__btn_disabled" type="submit"
                    aria-label="Войти" disabled={true}>Войти
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default withRouter(Login)

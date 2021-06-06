import React from 'react';
import {withRouter } from "react-router-dom";

function Login({handleLogin}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
        <form className="form" name="login" onSubmit={handleSubmit}  noValidate>
          <fieldset className="form__fieldset form__fieldset_place_auth">
            <label className="form__label">
              <input className="form__input form__input_email form__input_place_auth" type="email" value={email}  placeholder="Email" name="auth-email" minLength="2" maxLength="40" required onChange={handleChangeEmail} />
              <span className="form__input-error auth-email-error"></span>
            </label>
            <label className="form__label">
              <input className="form__input form__input_about form__input_place_auth" type="password" value={password} placeholder="Пароль" name="auth-password" minLength="2" maxLength="200" required  onChange={handleChangePassword} />
              <span className="form__input-error auth-password-error"></span>
            </label>
            <button className="form__btn form__btn_save form__btn_place_auth" type="submit" aria-label="Войти">Войти</button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default withRouter(Login)
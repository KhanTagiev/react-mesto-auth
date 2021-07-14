import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("Жак-Ив Кусто");
  const [description, setDescription] = React.useState("Исследователь океана");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="form__label">
        <input
          className="form__input form__input_name"
          type="text"
          value={name}
          placeholder="Имя"
          name="profile-name"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
        />
        <span className="form__input-error profile-name-error"></span>
      </label>
      <label className="form__label">
        <input
          className="form__input form__input_about"
          type="text"
          value={description}
          placeholder="О себе"
          name="profile-about"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDescription}
        />
        <span className="form__input-error profile-about-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

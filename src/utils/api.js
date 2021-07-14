class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  sendNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard({ _id }) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus({ _id }, isLiked) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "11e9f0e1-4daa-4439-a2bf-878699998a8c",
    "Content-Type": "application/json",
  },
});

export default api;

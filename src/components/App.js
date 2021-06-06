import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import profileAvatar from '../images/profile-avatar.jpg';
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as mestoAuth from '../utils/mestoAuth.js'


function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: profileAvatar });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    handleCheckToken();
  }, [])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isClicked: false,
    name: '',
    url: ''
  });

  const [status, setStatus] = React.useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({
      isClicked: false,
      name: '',
      url: ''
    })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard({
      isClicked: true,
      name: card.name,
      url: card.link
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards(cards.filter(item => item !== card))
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card, inputsClean) {
    api.sendNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
        inputsClean()
      })
      .catch((err) => console.log(err))
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mestoAuth.checkToken(jwt)
        .then((data) => {
          setUserEmail(data.data.email)
          setLoggedIn(true)
          history.push("/")
        })
        .catch(err => console.log(err))
    } else {
      return;
    }
  }

  function handleRegister(email, password) {
    mestoAuth.register(email, password)
      .then((data) => {
        setStatus(true)
        setIsInfoTooltipPopupOpen(true)
      })
      .catch((err) => {
        setStatus(false)
        setIsInfoTooltipPopupOpen(true)
      })
  }

  function handleLogin(email, password) {
    mestoAuth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        handleCheckToken()
      })
      .catch((err) => {
        setStatus(false)
        setIsInfoTooltipPopupOpen(true)
      })
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
        loggedIn={loggedIn} 
        userEmail={userEmail}
        onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm title='Вы уверены?' name='photo-card-delete'>
          <button className="popup__btn popup__btn_delete" type="button" aria-label="Удалить">Да</button>
        </PopupWithForm>
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} status={status} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

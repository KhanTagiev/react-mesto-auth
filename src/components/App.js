import React from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import profileAvatar from '../images/profile-avatar.jpg';
import ProtectedRoute from "./ProtectedRoute";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import * as mestoAuth from '../utils/mestoAuth';
import {formAvatarSelector, formCardSelector, formProfileSelector, validateSelectors} from "../utils/constants";
import FormValidator from "../utils/formValidator";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: profileAvatar
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [profileFormValidator, setProfileFormValidator] = React.useState();
  const [avatarFormValidator, setAvatarFormValidator] = React.useState();
  const [cardFormValidator, setCardFormValidator] = React.useState();

  React.useEffect(() => {
    handleCheckToken();
    setProfileFormValidator(handleFormsValidatorCreate(formProfileSelector));
    setAvatarFormValidator(handleFormsValidatorCreate(formAvatarSelector));
    setCardFormValidator(handleFormsValidatorCreate(formCardSelector));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    if (profileFormValidator !== undefined) {
      profileFormValidator.enableValidation()
    }
  }, [profileFormValidator])

  React.useEffect(() => {
    if (avatarFormValidator !== undefined) {
      avatarFormValidator.enableValidation()
    }
  }, [avatarFormValidator])

  React.useEffect(() => {
    if (cardFormValidator !== undefined) {
      cardFormValidator.enableValidation()
    }
  }, [cardFormValidator])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isHeaderNavMenuOpen, setIsHeaderNavMenuOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isClicked: false,
    name: '',
    url: '',
    _id: ''
  });

  const [status, setStatus] = React.useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false)
    setIsInfoTooltipPopupOpen(false);
    setIsHeaderNavMenuOpen(false)
    setSelectedCard({
      isClicked: false,
      name: '',
      url: '',
      _id: ''
    })
    profileFormValidator.clearValidation();
    avatarFormValidator.clearValidation();
    cardFormValidator.clearValidation();
  }

  function handleFormsValidatorCreate(popupSelector) {
    const formElement = document.querySelector(popupSelector).querySelector('.form')
    const formValidatorElement = new FormValidator(validateSelectors, formElement);

    return formValidatorElement
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

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true)
  }


  function handleNavMenuOpenClick() {
    setIsHeaderNavMenuOpen(true)
  }

  function handleCardClick(isTrue, card) {
    setSelectedCard({
      isClicked: isTrue,
      name: card.name,
      url: card.link,
      _id: card._id
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
        setCards([newCard, ...cards]);
        closeAllPopups();
        inputsClean();
      })
      .catch((err) => console.log(err))
  }

  function handleCardDeleteSubmit(card) {
    api.deleteCard(card)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups();
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
        .catch(err => {
          localStorage.removeItem("jwt")
          console.log(err)
        })
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
          isOpen={isHeaderNavMenuOpen}
          onNavOpen={handleNavMenuOpenClick}
          onClose={closeAllPopups}
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
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route path="">
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>
        </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <DeleteCardPopup card={selectedCard} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDeleteSubmit}/>
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} status={status}/>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

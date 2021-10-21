
import '../index.css';
import Header from './Header';
import React from 'react';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Spinner from './Spinner';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import * as auth from "../utils/auth.js";
import InfoToolTip from "./InfoToolTip"
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(({ isOpen: false }));
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    setIsLoading(true)
    api.getInitialData()
      .then(
        (data) => {
          const [userData, initialCardsData] = data;
          setCards(initialCardsData);
          setCurrentUser(userData);
        })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [])



  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(
        (newCard) => {
          const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        })
  }
  
  

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(selectedCard._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem._id !== selectedCard._id);
          setCards(newCards);
          closeAllPopups();
        })
      .catch((err) => console.log(err))
  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }
  function handleInfoToolTipOpen() {
    setIsInfoToolTipOpen(true);
  }

  function handleRegistration(password, email) {
    auth.registration(password, email)
    .then((data) => {
        setIsRegistered(true);
        handleInfoToolTipOpen();
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
        handleInfoToolTipOpen();
      })
  }
  


  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name
    })
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard({ isOpen: false });
    setConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false)

  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api.changeUserInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })


  }
  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.changeUserAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })

  }
  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.newCardAdd('cards', data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardDeleteRequest(card) {
    setSelectedCard(card);
    setConfirmPopupOpen(true);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    history.push("/login");
  }

  function handleLogin(password, email) {
    auth.authorization(password, email)
    .then((data) => {
        setLoggedIn(true);
        setUserEmail(email);
        history.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }
 

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setUserEmail(res.data["email"]);
          setLoggedIn(true);
          history.push("/");
        }
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Spinner isLoading={isLoading} />
        <Header userEmail={userEmail} onSingOut={handleSignOut} />
        <Switch>
        <Route path="/sign-in">
            <Login  handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration}/>
          </Route>

            <ProtectedRoute
              component={Main}
              path="/"
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteRequest={handleCardDeleteRequest} />
            
        

         

        </Switch>
        {loggedIn && <Footer />}
        

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} btnText='Создать' onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <PopupWithForm name='delete' text='Вы уверены' btnText='Да' />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />
        <InfoToolTip isInfoToolTipOpen={isInfoToolTipOpen} isRegistered={isRegistered} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

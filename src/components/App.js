
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


function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(({ isOpen: false }));
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)

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
        },
        (err) => {
          console.log(err);
        }
      )
  }
  // function handleCardDelete(card) {
  //   api.deleteCard(`cards/${card._id}`)
  //     .then(() => {
  //       setCards(cards => cards.filter((state) => state._id !== card._id))
  //     })
  //     .catch((err) => console.log(err))
  // }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(selectedCard._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem._id !== selectedCard._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch ((err) => console.log(err))  
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
    setSelectedCard({isOpen: false});
    setConfirmPopupOpen(false)
    
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Spinner isLoading = {isLoading}/>
        <Header />
        
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDeleteRequest={handleCardDeleteRequest}/>
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading = {isLoading}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading = {isLoading}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} btnText='Создать' onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading = {isLoading} />
        <PopupWithForm name='delete' text='Вы уверены' btnText='Да' />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

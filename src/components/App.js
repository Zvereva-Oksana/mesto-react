import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
            ([dataUser, dataCard]) => {
                setCurrentUser(dataUser)
                setCards(dataCard);
            }).catch((err) => {
            console.log(err)
        });
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some((elem) => elem['_id'] === currentUser['_id']);
        if (!isLiked) {
            api.addLikeCard(card['_id']).then((item) => {
                setCards((cards) => cards.map((elem) => elem['_id'] === card['_id'] ? item : elem));
            }).catch((err) => {
                console.log(err)
            })
        } else {
            api.deleteLikeCard(card['_id']).then((item) => {
                setCards((cards) => cards.map((elem) => elem['_id'] === card['_id'] ? item : elem));
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card['_id']).then((item) => {
            setCards(cards.filter((elem) => elem['_id'] === card['_id'] ? '' : item));
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleClickEditProfilePopup() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }

    function handleClickAddPlacePopup() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    function handleClickEditAvatarPopup() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser(dataUser) {
        api.setUserInfo(dataUser).then((newDataUser) => {
            setCurrentUser(newDataUser);
            closeAllPopups()
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleUpdateAvatar(avatar) {
        api.editUserAvatar(avatar).then((newAvatar) => {
            setCurrentUser(newAvatar);
            closeAllPopups()
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleAddPlaceSubmit(cardData) {
        api.addNewCard(cardData).then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    onEditProfile={handleClickEditProfilePopup}
                    onAddPlace={handleClickAddPlacePopup}
                    onEditAvatar={handleClickEditAvatarPopup}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    selectedCard={selectedCard}
                    onClose={closeAllPopups}
                />
                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

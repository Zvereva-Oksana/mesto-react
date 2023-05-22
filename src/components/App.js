import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)

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

    return (
        <div className="page">
            <Header/>
            <Main
                onEditProfile={handleClickEditProfilePopup}
                onAddPlace={handleClickAddPlacePopup}
                onEditAvatar={handleClickEditAvatarPopup}
                onCardClick={handleCardClick}
            />
            <PopupWithForm
                name='edit-profile'
                isOpen={isEditProfilePopupOpen}
                title='Редактировать профиль'
                buttonName='Сохранить'
                onClose={closeAllPopups}
                nameForm='editProfileForm'>
                <input required type="text" className="popup__input popup__input_type_name" id="name" name="name"
                       placeholder="Имя"
                       minLength="2" maxLength="40"/>
                <span className="popup__input-error popup__input-error_type_name"/>
                <input required type="text" className="popup__input popup__input_type_job" id="job" name="job"
                       placeholder="Вид деятельности" minLength="2" maxLength="200"/>
                <span className="popup__input-error popup__input-error_type_job"/>
            </PopupWithForm>
            <PopupWithForm
                name='add-card'
                isOpen={isAddPlacePopupOpen}
                title='Новое место'
                buttonName='Создать'
                onClose={closeAllPopups}
                nameForm='addPlaceForm'>
                <input type="text" className="popup__input popup__input_type_place" id="place" name="place"
                       placeholder="Название" required minLength="2" maxLength="30"/>
                <span className="popup__input-error popup__input-error_type_place"/>
                <input type="url" className="popup__input popup__input_type_link" id="link" name="link"
                       placeholder="Ссылка на картинку" required/>
                <span className="popup__input-error popup__input-error_type_link"/>
            </PopupWithForm>
            <PopupWithForm
                name='edit-avatar'
                isOpen={isEditAvatarPopupOpen}
                title='Обновить аватар'
                buttonName='Сохранить'
                onClose={closeAllPopups}
                nameForm='editAvatarForm'>
                <input type="url" className="popup__input popup__input_type_avatar" id="avatar" name="avatar"
                       placeholder="Ссылка на новый аватар" required/>
                <span className="popup__input-error popup__input-error_type_avatar"/>
            </PopupWithForm>
            <ImagePopup
                selectedCard={selectedCard}
                onClose={closeAllPopups}/>
            <Footer/>
        </div>
    );
}

export default App;

import React from 'react';
import Card from "./Card";

function Main({avatar, name, about, cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
    return (
        <>
        <section className="profile" aria-label="Профиль">
            <div className="profile__info">
                <img onClick={onEditAvatar} src={avatar} className="profile__avatar" alt="Ваше фото" />
                    <div className="profile__wrapper">
                        <div className="profile__name-wrapper">
                            <h1 className="profile__name">{name}</h1>
                            <button onClick={onEditProfile} type="button" className="profile__button-edit"/>
                        </div>
                        <p className="profile__job">{about}</p>
                    </div>
            </div>
            <button onClick={onAddPlace} type="button" className="profile__button-add"/>
        </section>
            <section className="element" aria-label="Коллекция карточек">
            {cards.map((card)=>(
                <Card
                    key={card['_id']}
                    card={card}
                    onCardClick={onCardClick}
                />
            ))
            }
            </section>
            <div className="popup popup_delete-card">
                <div className="popup__container">
                    <button type="button" className="popup__close-icon"/>
                    <h2 className="popup__heading popup__heading_consent-deletion">Вы уверены?</h2>
                    <button type="button" className="popup__button popup__button_consent-deletion">Да</button>
                </div>
            </div>
        </>
    );
}

export default Main;
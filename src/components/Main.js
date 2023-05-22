import React, {useEffect, useState} from 'react';
import Card from "./Card";
import {api} from "../utils/api";


function Main({
                  onEditProfile,
                  onAddPlace,
                  onEditAvatar,
                  onCardClick,
              }) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
            ([dataUser, dataCard]) => {
                setUserName(dataUser.name)
                setUserDescription(dataUser.about);
                setUserAvatar(dataUser.avatar);
                setCards(dataCard);
            }).catch((err) => {
            console.log(err)
        });
    }, [])

    return (
        <main>
            <section className="profile" aria-label="Профиль">
                <div className="profile__info">
                    <img onClick={onEditAvatar} src={userAvatar} className="profile__avatar" alt="Ваше фото"/>
                    <div className="profile__wrapper">
                        <div className="profile__name-wrapper">
                            <h1 className="profile__name">{userName}</h1>
                            <button onClick={onEditProfile} type="button" className="profile__button-edit"/>
                        </div>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"/>
            </section>
            <section className="element" aria-label="Коллекция карточек">
                {cards.map((card) => (
                    <Card
                        key={card['_id']}
                        card={card}
                        onCardClick={onCardClick}
                    />
                ))
                }
            </section>
        </main>
    );
}

export default Main;
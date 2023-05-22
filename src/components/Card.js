import React from "react";

function Card({onCardClick, card}) {

    function handleImageClick() {
        onCardClick(card)
    }

    return (
        <div id={card.id} className="card">
            <button type="button" className="card__delete"/>
            <img className="card__mask" src={card.link} alt={card.name} onClick={handleImageClick}/>
            <div className="card__wrapper">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button type="button" className="card__vector"/>
                    <span className="card__count-likes">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
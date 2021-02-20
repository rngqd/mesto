export default class Card {
	constructor({ name, link, likes, owner, _id, userId }, templateElement, handleCardClick, deleteHandler,addlike,removeLike) {
		this._name = name;
		this._link = link;
		this._templateElement = templateElement;
		this._handleCardClick = handleCardClick;
		this._ownerId = owner._id;
		this._imageId = _id;
		this._likes = likes;
		this._userId = userId;
		this._deleteHandler = deleteHandler
		this._addlike = addlike;
		this._removeLike = removeLike;
		this._toggleLikeButton = this._toggleLikeButton.bind(this);
	}

	_getTemplate() {
		const initialCard = this._templateElement.content.querySelector(".galary__card").cloneNode(true);
		return initialCard;
	}

	_toggleLikeButton(evt) {
		this._addlike()
		if (!evt.target.classList.contains('galary__like_active')) {
			this._element.querySelector('.galary__like').classList.add('galary__like_active')
			this._addlike()
		}
		else {
			this._element.querySelector('.galary__like').classList.remove('galary__like_active')
			this._removeLike()
		}
	}

	_deleteCard() {
		this._element.remove();
		this._element = null;
	}

	_setEventListener() {
		this._removeButton = this._element.querySelector(".galary__trash")
		if (this._removeButton) {
			this._removeButton.addEventListener("click", this._deleteHandler);
		}
		this._element.querySelector(".galary__like").addEventListener("click", this._toggleLikeButton);
		;
		this.cardImage.addEventListener("click", () => {
			this._handleCardClick(this._name, this._link);
		});
	}

	generateCard() {
		this._element = this._getTemplate();
		this._checkCardOwner();
		this._likes.forEach(item => {
			if (item._id === this._userId) {
				this._element.querySelector('.galary__like').classList.add('galary__like_active')
			}
		})
		this._likeCouner = this._element.querySelector('.galary__like-counter')
		this._likeCouner.textContent = this._likes.length;
		this.cardImage = this._element.querySelector(".galary__image");
		this._setEventListener();
		this.cardImage.src = this._link;
		this.cardImage.alt = this._name;
		this._element.querySelector(".galary__text").textContent = this._name;
		return this._element;
	}
	_checkCardOwner() {
		if (this._ownerId !== this._userId) {
			this._element.querySelector(".galary__trash").remove();
		}
	}
	returnCardId() {
		return this._imageId
	}

	changeLikeCounter(counter) {
		this._likeCouner.textContent = counter;
	}
}

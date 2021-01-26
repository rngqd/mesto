import { addImagePopUp } from "./index.js";
export class Card {
	constructor(name, link, templateElement) {
		this._name = name;
		this._link = link;
		this._templateElement = templateElement;
	}

	_getTemplate() {
		const initialCard = this._templateElement.content.querySelector(".galary__card").cloneNode(true);
		return initialCard;
	}

	_activateLikeButton() {
		this._element.querySelector(".galary__like").classList.toggle("galary__like_active");
	}

	_activateTrashButton() {
		this._element.remove();
	}

	_setEventListener() {
		this._element.querySelector(".galary__like").addEventListener("click", () => {
			this._activateLikeButton();
		});
		this._element.querySelector(".galary__trash").addEventListener("click", () => {
			this._activateTrashButton();
		});
    this._element.querySelector(".galary__image").addEventListener('click', () => {
      addImagePopUp(this._text, this._link)
    });
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListener();
		this._element.querySelector(".galary__image").src = this._link;
		this._element.querySelector(".galary__text").textContent = this._name;
		return this._element;
	}
}

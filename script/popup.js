export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = document.querySelector(popupSelector);
		this._buttonClose = this._popupSelector.querySelector(".popup__close");
		this.close = this.close.bind(this);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open() {
		this._popupSelector.classList.add("popup_visible");
	}

	close() {
		this._popupSelector.classList.remove("popup_visible");
	}

	_handleEscClose(evt) {
		const activePopUP = document.querySelector(".popup_visible");
		if (evt.key === "Escape" && activePopUP != null) {
			this.close();
		}
	}
	setEventListeners() {
		this._buttonClose.addEventListener("click", this.close);
		document.addEventListener("keydown", this._handleEscClose);
	}
}

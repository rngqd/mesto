import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._imageName = this._popup.querySelector(".popup-image__text");
		this._imageSrc = this._popup.querySelector(".popup-image__image");
	}

  openWithImage(name, link) {
		super.open();
		this._imageName.textContent = name;
    this._imageSrc.src = link;
    console.log(this._imageSrc.src)
	}
}

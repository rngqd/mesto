import Popup from "./Popup.js";
export default class ConfirmDeletePopup extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._confirmDeleteButton = document.querySelector(".popup__save_delete_card");
  }
  
  setEventListeners(removeCard) {
    super.setEventListeners();
    this._handlerButtonConmfim = removeCard;
    this._confirmDeleteButton.addEventListener('click', this._handlerButtonConmfim);
  }

  close() {
    super.close();
    this._confirmDeleteButton.removeEventListener('click', this._handlerButtonConmfim);
  }
}


import Popup from "./popup.js";
export default class PopupWithForms extends Popup {
  constructor(popupSelector, { formSubmitHandler } ) {
		super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupSelector.querySelector('.popup__form');
  }
  
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__profile')
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
   
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues())
      this.close()
    })
  }
  
  close() {
    super.close();
    this._form.reset()
  }
}

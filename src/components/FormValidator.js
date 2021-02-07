export default class FormValidation {
	constructor(form, config) {
		this._form = form;
		this._config = config;
		this._submitbutton = this._form.querySelector(this._config.submitButtonSelector);
		this._inputList = this._form.querySelectorAll(this._config.inputSelector);
	}

	_showError(input) {
		const error = this._form.querySelector(`#${input.id}-error`);
		error.textContent = input.validationMessage;
		input.classList.add(this._config.inputInvalidClass);
	}

	_hideError(input) {
		const error = this._form.querySelector(`#${input.id}-error`);
		error.textContent = "";
		input.classList.remove(this._config.inputInvalidClass);
	}

	_checkInputValidity(input) {
		if (input.validity.valid) {
			this._hideError(input);
		} else {
			this._showError(input);
		}
	}

	_setButtonState() {
		if (this._form.checkValidity()) {
			this._submitbutton.classList.remove(this._config.buttonInvalidClass);
			this._submitbutton.disabled = false;
		} else {
			this._submitbutton.classList.add(this._config.buttonInvalidClass);
			this._submitbutton.disabled = "disabled";
		}
	}

	_setEventListener() {
		this._inputList.forEach((input) => {
			input.addEventListener("input", (evt) => {
				this._checkInputValidity(input);
				this._setButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListener();
		this._form.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		this._setButtonState(this._submitbutton, this._form.checkValidity(), this._config);
	}

	resetValidation() {
		this._inputList.forEach((inputElement) => {
			this._hideError(inputElement);
		});
		this._setButtonState();
	}
}

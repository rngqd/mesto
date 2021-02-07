export class FormValidation {
	constructor(form, config) {
		this._form = form;
		this._config = config;
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
		const submitButton = this._form.querySelector(
			this._config.submitButtonSelector
		);
		if (this._form.checkValidity()) {
			submitButton.classList.remove(this._config.buttonInvalidClass);
			submitButton.disabled = false;
		} else {
			submitButton.classList.add(this._config.buttonInvalidClass);
			submitButton.disabled = "disabled";
		}
	}

	_setEventListener() {
		const inputList = this._form.querySelectorAll(this._config.inputSelector);
		inputList.forEach((input) => {
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
		const submitButton = this._form.querySelector(
			this._config.submitButtonSelector
		);
		this._setButtonState(
			submitButton,
			this._form.checkValidity(),
			this._config
		);
	}
}

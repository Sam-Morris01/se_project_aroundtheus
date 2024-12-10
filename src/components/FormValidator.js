export default class FormValidator {
    constructor(config, formElement) {
        this._formSelctor = config.formSelctor;
        this.inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._submitButtonDisabled = config.submitButtonDisabled;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = " ";
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
          this._submitButton.disabled = true;
        } else {
          this._hideInputError(inputElement);
        }
      }

      _toggleButtonState() {    
        if (this._hasInvalidInput()) {
          this.disableButton();
        } else {
          this._submitButton.classList.remove(this._submitButtonDisabled);
          this._submitButton.disabled = false;
        }
      }

      _hasInvalidInput() {
        return !this._inputElements.every(
          (inputElement) => inputElement.validity.valid
        );
      }

      _setEventListeners() {
        this._inputElements = [
          ...this._formElement.querySelectorAll(this.inputSelector),
        ];
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputElements.forEach((inputElement) => {
          inputElement.addEventListener("input", (e) => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
      }


      disableButton() {
        this._submitButton.classList.add(this._submitButtonDisabled);
        this._submitButton.disabled = true;
      }

      
      enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this.disableButton();
        });
        this._setEventListeners();
      }

      // resetValidation() {
      //   //creates a variable to the input list
      //   // this variable will receive a list of inputs inside the form element. NTS: You already have a variable for formElement, so you can use this._formElement + querySelectorAll
    
      //   //now that a list of inputs is set up, forEach one of them, hideInputError
      //   this._inputElements.forEach((input) => this._hideInputError(input));
    
      //   // NTS: also, toggle the submit button (this._toggleButtonState())
      //   this._toggleButtonState();
      // }
    



}
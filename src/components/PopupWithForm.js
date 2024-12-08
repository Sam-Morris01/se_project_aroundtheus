import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.form = this.popupElement.querySelector(".modal__form")
        this.inputList = this.form.querySelectorAll(".modal__form-input")
    }

    _getInputValues() {
        const inputValues = {};
        this.inputList.forEach(input => {  
            console.log(`Input name: ${input.name}, Input value: ${input.value}`);
            inputValues[input.name] = input.value
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputValues = this._getInputValues();
            this.handleFormSubmit(inputValues);
          });
          
    }

    open(){
        super.open(this.form);
    }

    close() {
        super.close();
        this.form.reset();
    }
}
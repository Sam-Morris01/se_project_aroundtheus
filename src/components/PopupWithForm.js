import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popupElement.querySelector(".modal__form");
    this.inputList = this.form.querySelectorAll(".modal__form-input");
    this.submitButton = this.form.querySelector(".modal__form-button");
    this.defaultSubmitText = this.submitButton.textContent; // Save default button text
  }

  // Collect input values from the form
  _getInputValues() {
    const inputValues = {};
    this.inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Set input values dynamically
  setInputValues(data) {
    this.inputList.forEach(input => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name];
      } else {
        input.value = "";
      }
    });
  }

  // Reset the form
  resetForm() {
    this.form.reset();
  }

  // Change button state (e.g., loading state)
  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this.submitButton.textContent = loadingText; // Show "Saving..."
      this.submitButton.disabled = true; // Disable button
    } else {
      this.submitButton.textContent = this.defaultSubmitText; // Restore default text
      this.submitButton.disabled = false; // Enable button
    }
  }

  // Add event listeners for form submission
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this.setLoading(true, "Saving..."); // Set loading state
  
      Promise.resolve(this.handleFormSubmit(inputValues))
        .finally(() => this.setLoading(false)); // Reset loading state
    });
  }
  
  

  // Override close method to reset form
  close() {
    super.close();
    this.resetForm();
  }
}

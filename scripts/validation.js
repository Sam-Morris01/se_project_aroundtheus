

function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessage = formEl.querySelector(`#${inputEl.id}-error`)
    inputEl.classList.add(errorClass)
    errorMessage.classList.add(inputErrorClass)
    errorMessage.textContent = inputEl.validationMessage
}

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessage = formEl.querySelector(`#${inputEl.id}-error`)
    inputEl.classList.remove(errorClass)
    errorMessage.classList.remove(inputErrorClass)
    errorMessage.textContent = " "
}

function checkInputValidity(formEl, inputEl, options){
    if(!inputEl.validity.valid){
        showInputError(formEl, inputEl, options)
    } else {
        hideInputError(formEl, inputEl, options)
    }
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
    let foundInvalid = false;

    inputEls.forEach((inputEl) => {
        if(!inputEl.validity.valid){
            foundInvalid = true;
        }
    });


    if(foundInvalid) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    }

}

function setEventListeners(formEl, options) {
    const {inputSelector, submitButtonSelector} = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
             checkInputValidity(formEl, inputEl, options)
             toggleButtonState(inputEls, submitButton, options)
        })
    })
}


function enableValidation (options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
            e.preventDefault()
        })
        setEventListeners(formEl, options)
    })
}

//Trying out

function clearFormErrors(formEl, {inputErrorClass, errorClass}) {
    const inputEls = [...formEl.querySelectorAll('.modal__form-input')];
    inputEls.forEach(inputEl => {
        const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(errorClass);
        errorMessage.classList.remove(inputErrorClass);
        errorMessage.textContent = '';
    });
}

const editModalForm = document.querySelector('#edit-modal .modal__form');
const addModalForm = document.querySelector('#add-modal .modal__form');

const closeEditButton = document.getElementById('close-edit-button');
const closeAddButton = document.getElementById('close-add-button');

closeEditButton.addEventListener('click', () => {
    clearFormErrors(editModalForm, config);
});

// Clear errors when closing the add modal
closeAddButton.addEventListener('click', () => {
    clearFormErrors(addModalForm, config);
});

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__form-button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"

  }


enableValidation(config);
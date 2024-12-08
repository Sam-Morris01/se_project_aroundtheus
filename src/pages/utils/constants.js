const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };


  export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
];

import FormValidator from "../../components/FormValidator";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */


//Edit Profile Modal//
const profileEditModal = document.querySelector('#edit-modal');
const closeEditModal = document.querySelector('#close-edit-button');


//Add Image Modal/
const addCardButton = document.querySelector('#add-button');
const addCardModal = document.querySelector('#add-modal');
const closeAddModal = document.querySelector('#close-add-button');

//Add Image Form//
const formImageName = document.querySelector('#inputTitle');
const formImageUrl = document.querySelector('#inputURL')
const formName = document.querySelector('#inputName');
const formDescription = document.querySelector('#inputDescription');
const profileEditForm = profileEditModal.querySelector('.modal__form')
const addImageForm = addCardModal.querySelector('.modal__form')
const submitButton = addCardModal.querySelector('.modal__form-button')

//Preview Modal//
const previewModal = document.querySelector('#preview-modal');
const closePreviewModal = document.querySelector('#close-preview-button');
const previewImage = document.querySelector('.modal__preview-image');
const previewName = document.querySelector('.modal__preview');

//Cards
const name = document.querySelector('#profileName');
const description = document.querySelector('#profileDescription');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild
const cardListEL = document.querySelector('.cards__list');
const cardImage = document.querySelector(".card__image");
const mainPage = document.querySelector('.page__content')
const closeButtons = document.querySelectorAll('.modal__button-close')




/* Form Validators */
const newCardFormValidation = new FormValidator(config, addCardModal);
newCardFormValidation.enableValidation();

const editProfileValidation = new FormValidator(config, profileEditModal);
editProfileValidation.enableValidation();
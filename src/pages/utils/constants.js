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


const addCardModal = document.querySelector('#add-modal');


export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector('#add-button');
export const addCardModalSelector = '#add-modal';
export const previewModal = '#preview-modal'
export const editProfileSelector = '#edit-modal';
export const cardSelector = '#card-template';


/* Form Validators */
const newCardFormValidation = new FormValidator(config, addCardModal);
newCardFormValidation.enableValidation();

const editProfileValidation = new FormValidator(config, profileEditModal);
editProfileValidation.enableValidation();
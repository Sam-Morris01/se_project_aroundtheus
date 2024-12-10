export const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__form-button",
    submitButtonDisabled: "modal__form-button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  
  }

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



/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */


export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector('#add-button');
export const addCardFormSelector = '#add-card-form';
export const previewModal = '#preview-modal'
export const editProfileSelector = '#edit-modal';
export const cardSelector = '#card-template';
export const editProfileForm = '#edit-profile-form'
export const addCardModalSelector = "#add-modal"
export const addCardFormElement = document.querySelector('#add-card-form');


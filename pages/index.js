import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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


function handleImageClick (cardData) {
  previewImage.src = cardData.link;
  previewName.textContent = cardData.name
  previewImage.alt = cardData.name
  openModal(previewModal)
}

const cardSelector = '#card-template';

const createCard = (data) => {
  const card = new Card(data, cardSelector, handleImageClick);
  return card.getView();
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  submitButtonDisabled: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"

}


/*Elements*/

//Edit Profile Modal//
const profileEditModal = document.querySelector('#edit-modal');
const closeEditModal = document.querySelector('#close-edit-button');
const editProfileButton = document.querySelector(".profile__edit-button");

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

/*Elements*/

//Define an object to store the validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");

    // Here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}


//call the enableValidation function on the config object
enableValidation(config);



function renderCard(cardData, wrapper) {
    const cardElement = createCard(cardData);
    wrapper.prepend(cardElement);
}



//Event handlers   
function handleProfileSubmited (e) {
    e.preventDefault();
    name.textContent = formName.value;
    description.textContent = formDescription.value;
    closePopup(profileEditModal);
}

function handleAddSubmited (e) {
    e.preventDefault();
    console.log(formImageName)
    const name = formImageName.value;
    const link = formImageUrl.value;
    renderCard({name, link}, cardListEL);
    closePopup(addCardModal);
    addImageForm.reset();
}



  
//Event Listeners
editProfileButton.addEventListener("click", () => {
    formName.value = name.textContent;
    formDescription.value = description.textContent;
    openModal(profileEditModal)
})

addCardButton.addEventListener("click", () => {
    openModal(addCardModal)
    
})



function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeOverlay);
  }
  
  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalEsc);
    modal.addEventListener("mousedown", closeOverlay);
  }
  
function closeOverlay(e) {
    if (e.target.classList.contains("modal")) {
      closePopup(e.target);
    }
  }
  
  function closeModalEsc(e) {
    if (e.key === "Escape") {
      const modalOpened = document.querySelector(".modal_opened");
      closePopup(modalOpened);
    }
}


profileEditForm.addEventListener('submit', handleProfileSubmited);
addImageForm.addEventListener('submit', handleAddSubmited);


closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closePopup(popup));
  });

initialCards.forEach( (cardData) => renderCard(cardData, cardListEL));


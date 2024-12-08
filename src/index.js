console.log("Script is loaded"); // Add this at the top of your JavaScript file


import './pages/index.css'
import UserInfo from "./components/UserInfo.js"
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards } from "./pages/utils/constants.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";



/*Elements*/

//Edit Profile Modal//

const closeEditModal = document.querySelector('#close-edit-button');
const editProfileButton = document.querySelector(".profile__edit-button");


//Add Image Modal/
const addCardButton = document.querySelector('#add-button');
const addCardModalSelector = '#add-modal';
const closeAddModal = document.querySelector('#close-add-button');

//Add Image Form//
const formImageName = document.querySelector('#inputTitle');
const formImageUrl = document.querySelector('#inputURL')
const formName = document.querySelector('#inputName');
const formDescription = document.querySelector('#inputDescription');


//Preview Modal//
const previewModal = '#preview-modal'
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



 const cardSelector = '#card-template';



const userInfo = new UserInfo({
  nameSelector: "#profileName",
  hobbySelector: "#profileDescription"
})

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardSelector, handleImageClick);
    const cardElement =  card.getView();
    cardSection.addElement(cardElement);
  }
},
".cards__list"
);

const editProfileSelector = '#edit-modal';

const popupWithForm = new PopupWithForm(editProfileSelector, (formData) => {
  userInfo.setUserInfo(formData);
})
popupWithForm.setEventListeners();

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  submitButtonDisabled: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"

}

const profileEditModal = document.querySelector(editProfileSelector);
const editProfileValidation = new FormValidator(config, profileEditModal);
editProfileValidation.enableValidation();


const addCardModal = document.querySelector(addCardModalSelector);
const newCardFormValidation = new FormValidator(config, addCardModal);
newCardFormValidation.enableValidation();

cardSection.renderItems();

function handleImageClick (cardData) {
  popupWithImage.open(cardData)
};

function handleProfileSubmited (inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    hobby: inputValues.description
  });
  editProfileModal.close()
}

function handleAddSubmitted(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.url };
  const newCard = createCard(cardData);
  cardSection.addElement(newCard); // Append the card to the card section
  cardAddModal.close(); // Close the modal
}


function createCard({name, link}) {
  const card = new Card({name, link}, cardSelector, handleImageClick)
  const cardElement = card.getView();
  return cardElement;
}





const popupWithImage = new PopupWithImage(previewModal);
popupWithImage.setEventListeners();

// Select the modals
const cardAddModal = new PopupWithForm(
  addCardModalSelector,
  handleAddSubmitted
);
const editProfileModal = new PopupWithForm(
  editProfileSelector,
  handleProfileSubmited
);


//set the modal event listeners
addCardButton.addEventListener("click", () => cardAddModal.open());
editProfileButton.addEventListener("click", () => editProfileModal.open());

cardAddModal.setEventListeners();
editProfileModal.setEventListeners();






// const createCard = (data) => {
//   const card = new Card(data, cardSelector, handleImageClick);
//   return card.getView();

// };





/*Elements*/

//Define an object to store the validators
// const formValidators = {};

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(config, formElement);
//     // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
//     const formName = formElement.getAttribute("name");

//     // Here you store the validator using the `name` of the form
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   })
// }


// //call the enableValidation function on the config object
// enableValidation(config);



// function renderCard(cardData, wrapper) {
//     const cardElement = createCard(cardData);
//     wrapper.prepend(cardElement);
// }



// //Event handlers   







  
// //Event Listeners
// editProfileButton.addEventListener("click", () => {
//     formName.value = name.textContent;
//     formDescription.value = description.textContent;
//     openModal(profileEditModal)
// })





// function closePopup(modal) {
//     modal.classList.remove("modal_opened");
//     document.removeEventListener("keydown", closeModalEsc);
//     modal.removeEventListener("mousedown", closeOverlay);
//   }
  
//   function openModal(modal) {
//     modal.classList.add("modal_opened");
//     document.addEventListener("keydown", closeModalEsc);
//     modal.addEventListener("mousedown", closeOverlay);
    
//   }
  
// function closeOverlay(e) {
//     if (e.target.classList.contains("modal")) {
//       closePopup(e.target);
//     }
//   }
  
//   function closeModalEsc(e) {
//     if (e.key === "Escape") {
//       const modalOpened = document.querySelector(".modal_opened");
//       closePopup(modalOpened);
//     }
// }


// profileEditForm.addEventListener('submit', handleProfileSubmited);
// addImageForm.addEventListener('submit', handleAddSubmited);


// closeButtons.forEach((button) => {
//     const popup = button.closest(".modal");
//     button.addEventListener("click", () => closePopup(popup));
//   });

// initialCards.forEach( (cardData) => renderCard(cardData, cardListEL));


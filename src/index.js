console.log("Script is loaded"); // Add this at the top of your JavaScript file


import './pages/index.css'
import UserInfo from "./components/UserInfo.js"
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards } from "./pages/utils/constants.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import {editProfileButton, addCardButton, addCardModalSelector, previewModal, editProfileSelector, cardSelector} from "./pages/utils/constants.js"



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

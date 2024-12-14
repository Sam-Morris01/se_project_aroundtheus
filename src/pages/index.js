console.log("Script is loaded"); // Add this at the top of your JavaScript file


import './index.css'
import UserInfo from "../components/UserInfo.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "./utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {editProfileButton, addCardButton, addCardFormSelector, previewModal, editProfileSelector, cardSelector, config, editProfileForm, addCardModalSelector, addCardFormElement} from "./utils/constants.js"



const userInfo = new UserInfo({
  nameSelector: "#profileName",
  hobbySelector: "#profileDescription"
})

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement =  createCard(item);
    cardSection.addElement(cardElement);
  }
},
".cards__list"
);



const popupWithForm = new PopupWithForm(editProfileSelector, (formData) => {
  userInfo.setUserInfo({
    name: formData.title,
    job: formData.description
  });
})
popupWithForm.setEventListeners();



const profileEditForm = document.querySelector(editProfileForm);
const editProfileValidation = new FormValidator(config, profileEditForm);
editProfileValidation.enableValidation();


const addCardForm = document.querySelector(addCardFormSelector);
const newCardFormValidation = new FormValidator(config, addCardForm);
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
  addCardFormElement.reset()

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
editProfileButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  popupWithForm.setInputValues({
    title: currentUserData.name,
    description: currentUserData.job
  })
  editProfileModal.open()});

cardAddModal.setEventListeners();
editProfileModal.setEventListeners();

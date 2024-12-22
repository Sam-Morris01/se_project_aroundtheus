import './index.css';
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from '../components/Api.js';
import { editProfileButton, addCardButton, previewModal, editProfileSelector, cardSelector, config, editProfileForm, addCardModalSelector, addCardFormElement } from "./utils/constants.js";

// Initialize API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3058e262-bd72-484f-aef9-41d0e62ea999",
    "Content-Type": "application/json",
  },
});

// Initialize user info
const userInfo = new UserInfo({
  nameSelector: "#profileName",
  hobbySelector: "#profileDescription",
});

// Initialize section for cards
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addElement(cardElement);
    },
  },
  ".cards__list"
);

// Initialize Popups
const popupWithImage = new PopupWithImage(previewModal);
popupWithImage.setEventListeners();

const editProfileModal = new PopupWithForm(editProfileSelector, (inputValues) => {
  editProfileModal.setLoading(true, "Saving...");
  return api.updateUserInfo({
    name: inputValues.title,
    about: inputValues.description,
  })
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        hobby: updatedUser.about,
      });
      editProfileModal.close();
    })
    .catch((err) => console.error("Failed to update profile:", err))
    .finally(() => {
      editProfileModal.setLoading(false); // Reset button state
    });
});
editProfileModal.setEventListeners();




const addCardModal = new PopupWithForm(addCardModalSelector, (inputValues) => {
  addCardModal.setLoading(true, "Saving...");
  const cardData = { name: inputValues.title, link: inputValues.url };
  return api.createCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addElement(cardElement);
      addCardModal.close();
      addCardFormElement.reset();
    })
    .catch((err) => console.error("Failed to add card:", err))
    .finally(() => {
      addCardModal.setLoading(false); // Reset button state
    });
});
addCardModal.setEventListeners();



// Initialize Update Avatar Popup
const updateAvatarModal = new PopupWithForm("#update-avatar-modal", (inputValues) => {
  updateAvatarModal.setLoading(true, "Saving...");
  return api.updateAvatar(inputValues.avatar)
    .then((updatedUser) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.src = updatedUser.avatar; // Update profile picture
      updateAvatarModal.close();
    })
    .catch((err) => {
      console.error("Failed to update avatar:", err);
    })
    .finally(() => {
      updateAvatarModal.setLoading(false);
    });
});

updateAvatarModal.setEventListeners();

// Handle opening the modal when clicking the edit icon
document.querySelector(".profile__image-container").addEventListener("click", () => {
  updateAvatarModal.open();
});

// Ensure form validation
const updateAvatarFormElement = document.querySelector("#update-avatar-form");
if (updateAvatarFormElement) {
  const updateAvatarFormValidation = new FormValidator(config, updateAvatarFormElement);
  updateAvatarFormValidation.enableValidation();
} else {
  console.error("Update avatar form not found!");
} 


// Enable form validation
const editProfileFormElement = document.querySelector('#edit-profile-form');


// Check if forms are valid before initializing validators
if (editProfileFormElement) {
  const editProfileValidation = new FormValidator(config, editProfileFormElement);
  editProfileValidation.enableValidation();
} else {
  console.error('Edit profile form not found!');
}

if (addCardFormElement) {
  const newCardFormValidation = new FormValidator(config, addCardFormElement);
  newCardFormValidation.enableValidation();
} else {
  console.error('Add card form not found!');
}

// Load initial data
api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      hobby: userData.about,
    });
  })
  .catch((err) => console.error(err));

api.getInitialCards()
  .then((cards) => {
    cardSection.items = cards;
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

// Button event listeners
editProfileButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  editProfileModal.setInputValues({
    title: currentUserData.name,
    description: currentUserData.job,
  });
  editProfileModal.open();
});

addCardButton.addEventListener("click", () => addCardModal.open());


function handleImageClick (cardData) {
  popupWithImage.open(cardData)
};


const deleteModal = new PopupWithForm("#delete-modal", () => {
  // Ensure cardId and cardElement are correctly assigned
  if (deleteModal.cardId && deleteModal.cardElement) {
    api.deleteCard(deleteModal.cardId)
      .then(() => {
        deleteModal.cardElement.remove();
      })
      .catch((err) => console.error(err));
  } else {
    console.error("Card ID or element is missing!");
  }
});

deleteModal.setEventListeners();

// Pass card information to the delete modal in createCard
function createCard({ name = "No Name", link = "", _id = null, likes = [] } = {}) {
  if (!name || !link) {
    console.error("Invalid card data:", { name, link, _id });
    return;
  }

  const isLiked = likes.some((like) => like._id === userInfo.getUserId()); 

  const card = new Card(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    () => {
      deleteModal.cardId = _id;
      deleteModal.cardElement = card.getView();
      deleteModal.open();
    },
    api 
  );

  return card.getView();
}



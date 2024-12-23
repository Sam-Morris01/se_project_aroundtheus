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

// Store current user ID
let currentUserId;

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
      editProfileModal.setLoading(false);
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
      addCardModal.setLoading(false);
    });
});
addCardModal.setEventListeners();



const updateAvatarModal = new PopupWithForm("#update-avatar-modal", (inputValues) => {
  updateAvatarModal.setLoading(true, "Saving...");
  return api.updateAvatar(inputValues.avatar)
    .then((updatedUser) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.src = updatedUser.avatar; // Update profile picture in DOM
      updateAvatarModal.close();
    })
    .catch((err) => console.error("Failed to update avatar:", err))
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
  // Enable validation
  updateAvatarFormValidation.enableValidation();
  // Disable button initially
  const saveButton = updateAvatarFormElement.querySelector(".modal__form-button");
  saveButton.disabled = true;
  saveButton.classList.add(config.submitButtonDisabled); // Ensure the disabled style is applied
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
    currentUserId = userData._id; // Save current user ID
    userInfo.setUserInfo({
      name: userData.name,
      hobby: userData.about,
      id: userData._id,
    });

    const profileImage = document.querySelector(".profile__image");
    profileImage.src = userData.avatar; // Set the avatar
  })
  .catch((err) => console.error("Failed to fetch user info:", err));

  api.getInitialCards()
  .then((cards) => {
    cardSection.items = cards.map((card) => ({
      name: card.name,
      link: card.link,
      _id: card._id,
      likes: card.likes, // Include likes array
    }));
    cardSection.renderItems();
  })
  .catch((err) => console.error("Failed to fetch initial cards:", err));


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

//Delete Modal
const deleteModal = new PopupWithForm("#delete-modal", () => {
  if (deleteModal.cardId && deleteModal.cardElement) {
    api.deleteCard(deleteModal.cardId)
      .then(() => {
        console.log(deleteModal.cardElement)
        document.querySelector('.card').remove();
        deleteModal.close();
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
  
  const currentUserId = userInfo.getUserId(); // Get the stored user ID
  const isLiked = likes.some((like) => like._id === currentUserId); // Check if current user liked the card

  const card = new Card(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    () => {
      const cardElement = card.getView();
      deleteModal.cardId = _id;
      deleteModal.cardElement = cardElement; // Assign the card's DOM element
      deleteModal.open();
    },
    api 
  );
  return card.getView();
}



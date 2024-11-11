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
//Functions




function showPreview (cardData) {
    previewImage.src = cardData.link;
    previewName.textContent = cardData.name
    previewImage.alt = cardData.name
    openModal(previewModal)
}

function getCardElement (cardData) {
        //clone the template element with all its content and store it in a cardElement variable
        const cardElement = cardTemplate.cloneNode(true)
        //access the card title and image and store them in variables
        const cardImageEL = cardElement.querySelector(".card__image");
        const cardNameEL = cardElement.querySelector(".card__name");

        const deleteButton = cardElement.querySelector(".card__delete-button");
        const likeButton = cardElement.querySelector(".card__like-button");

        deleteButton.addEventListener("click", handleDeleteCard);

        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_active");
          });
        
        //set the path to the image to the link field of the object
        cardImageEL.src = cardData.link
        //set the image alt text to the name field of the object
        cardImageEL.alt = cardData.name
        //set the card title to the name field of the object, too
        cardNameEL.textContent = cardData.name;
        //return the ready HTML element with the filled-in data
        cardImageEL.addEventListener("click", () => showPreview(cardData));

        return cardElement;
}

function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
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
    const name = formImageName.value;
    const link = formImageUrl.value;
    renderCard({name, link}, cardListEL);
    formImageName.value = "";
    formImageUrl.value = "";
    closePopup(addCardModal);
}

function handleDeleteCard(e) {
    e.target.closest(".card").remove();
  }

function clearFormErrors(formEl, {inputErrorClass, errorClass}) {
    const inputEls = [...formEl.querySelectorAll('.modal__form-input')];
    inputEls.forEach(inputEl => {
        const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(errorClass);
        errorMessage.classList.remove(inputErrorClass);
        errorMessage.textContent = '';
    });
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




// closeEditModal.addEventListener("click", () => {
//     toggleModal(profileEditModal);
// })

// closeAddModal.addEventListener("click", () => {
//     toggleModal(addCardModal)
// })

// closePreviewModal.addEventListener("click", () => {
//     toggleModal(previewModal)
// })


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


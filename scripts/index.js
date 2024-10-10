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
const editProfileButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__button-close');
const name = document.querySelector('#profileName');
const description = document.querySelector('#profileDescription');
const formName = document.querySelector('#inputName');
const formDescription = document.querySelector('#inputDescription');
const profileEditForm = profileEditModal.querySelector('.modal__form')
const cardTemplate = document.querySelector('#card-template').content.firstElementChild
const cardListEL = document.querySelector('.cards__list');

//Functions
function hideModal () {
    profileEditModal.classList.remove('modal_opened')
}


function getCardElement (cardData) {
        //clone the template element with all its content and store it in a cardElement variable
        const cardElement = cardTemplate.cloneNode(true)
        //access the card title and image and store them in variables
        const cardImageEL = cardElement.querySelector(".card__image");
        const cardNameEL = cardElement.querySelector(".card__name");
        //set the path to the image to the link field of the object
        cardImageEL.src = cardData.link
        //set the image alt text to the name field of the object
        cardImageEL.alt = cardData.name
        //set the card title to the name field of the object, too
        cardNameEL.textContent = cardData.name;
        //return the ready HTML element with the filled-in data
        return cardElement;
}

//Event handlers   
function profileSubmited (e) {
    e.preventDefault();
    name.textContent = formName.value;
    description.textContent = formDescription.value;
    hideModal();
}

//Event Listeners
editProfileButton.addEventListener("click", () => {
    formName.value = name.textContent;
    formDescription.value = description.textContent;
    profileEditModal.classList.add('modal_opened')
})

closeModal.addEventListener("click", () => {
    hideModal()
})

profileEditForm.addEventListener('submit', profileSubmited);


initialCards.forEach( (cardData) => {
    cardElement = getCardElement(cardData);
    cardListEL.append(cardElement);

})

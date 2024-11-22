export default class Card {
    constructor({name, link}, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

   

    _setEventListeners() {
        //get the like button element
        this.likeButton = this._cardElement.querySelector(".card__like-button");
        //addEventListener to the like button
        this.likeButton.addEventListener('click', () => this._handleLikeButton());

        //get the delete button element
        this.deleteButton = this._cardElement.querySelector(".card__delete-button");
        //addEventListener to the delete button
        this.deleteButton.addEventListener('click', () => this._handleDeleteButton());

        this._imageElement.addEventListener("click", () => {
            this._handleImageClick({ name: this._name, link: this._link });
          });
      
    }

    //Like Button event handler
    _handleLikeButton() {
        this.likeButton.classList.toggle("card__like-button_active");
    }

    //Delete Button event handler
    _handleDeleteButton() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    //Add card event handler
    _handleAddSubmited() {
        this._cardElement.added();
        this._cardElement.null;
      }

    getView() {
        //get card elements
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true)

        //grab image element
        this._imageElement = this._cardElement.querySelector('.card__image');
        //grab image src
        this._imageElement.src = this._link;
        //grab image alt
        this._imageElement.alt = this._name;

        //get title element
        this._titleElement = this._cardElement.querySelector(".card__name")

        //grab title content
        this._titleElement.textContent = this._name;


        //set event listeners
        this._setEventListeners()

        //return card element
        return this._cardElement
    }
}
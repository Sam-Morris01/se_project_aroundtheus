export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector, handleImageClick, handleDeleteClick, api) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._api = api; // Store the API instance
  }

  _toggleLike() {
    if (this._isLiked) {
      // Call dislikeCard when already liked
      this._api.dislikeCard(this._id)
        .then((updatedCard) => {
          this._isLiked = false; // Update like state
          this._updateLikeIcon(); // Update heart color
        })
        .catch((err) => console.error("Failed to dislike card:", err));

    } else {
      // Call likeCard when not liked
      this._api.likeCard(this._id)
        .then((updatedCard) => {
          this._isLiked = true; // Update like state
          this._updateLikeIcon(); // Update heart color
        })
        .catch((err) => console.error("Failed to like card:", err));
    }
  }
  
  _updateLikeIcon() {
    if (this._isLiked) {
      this.likeButton.classList.add("card__like-button_active");
    } else {
      this.likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this.likeButton = this._cardElement.querySelector(".card__like-button");
    this.likeButton.addEventListener("click", () => this._toggleLike());

    this.deleteButton = this._cardElement.querySelector(".card__delete-button");
    this.deleteButton.addEventListener("click", this._handleDeleteClick);

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  getView() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    this._cardElement.setAttribute("data-id", this._id);

    this._imageElement = this._cardElement.querySelector('.card__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._titleElement = this._cardElement.querySelector(".card__name");
    this._titleElement.textContent = this._name;

    this.likeButton = this._cardElement.querySelector(".card__like-button");

    this._updateLikeIcon();
    this._setEventListeners();
    console.log("Created card element:", this._cardElement); // Add this
    return this._cardElement;
  }
}

import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageElement = this.popupElement.querySelector(".modal__preview-image");
        this.captionElement = this.popupElement.querySelector(".modal__preview");
    }

    open({ name, link }) {
        this.imageElement.src = link;
        this.imageElement.alt = name;
        this.captionElement.textContent = name;
        super.open(); // Call parent class open to actually open the modal
    }
    
}
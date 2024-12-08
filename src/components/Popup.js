export default class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        
        if (!this.popupElement) {
            throw new Error(`No element found with the selector: ${popupSelector}`);
        }
        this.closeOnEscape = this.closeOnEscape.bind(this);
        this._listenersAdded = false;
    }

    open() {
        const closeButtons = document.querySelectorAll('.modal__button-close')
        this.popupElement.classList.add("modal_opened");
        document.addEventListener('keydown', this.closeOnEscape);
        closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close())
        })

        
    }

    close() {
        this.popupElement.classList.remove("modal_opened");
        document.removeEventListener('keydown', this.closeOnEscape);
    }

    closeOnEscape(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        if (!this._listenersAdded) {
            this.popupElement.addEventListener("click", (event) => {
                if (
                    event.target.classList.contains("modal") ||
                    event.target.classList.contains("modal__close")
                ) {
                    this.close();
                }
            });
            this._listenersAdded = true;
        }
    }
}

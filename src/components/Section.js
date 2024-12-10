export default class Section {
    constructor({items, renderer}, selector) {
        this.items = items;
        this.renderer = renderer;
        this.container = document.querySelector(selector);
    }

    renderItems() {
        this.items.forEach(item => this.renderer(item));
    }

    addElement(element) {
        console.log("Appending card element to the section:", element);
        this.container.prepend(element)
    }
}
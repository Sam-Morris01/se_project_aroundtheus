export default class UserInfo {
    constructor({nameSelector, hobbySelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._hobbyElement = document.querySelector(hobbySelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._hobbyElement.textContent
        }
    }

    setUserInfo({ name, hobby }) {
        this._nameElement.textContent = name;
        this._hobbyElement.textContent = hobby;
    }
    
}

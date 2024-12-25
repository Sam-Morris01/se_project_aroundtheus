export default class UserInfo {
    constructor({ nameSelector, hobbySelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._hobbyElement = document.querySelector(hobbySelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._hobbyElement.textContent,
        };
    }

    setUserInfo({ name, hobby, id, avatar }) {
        if (name) this._nameElement.textContent = name;
        if (hobby) this._hobbyElement.textContent = hobby;
        if (id) this._userId = id;
        if (avatar) this._avatarElement.src = avatar;
    }

    getUserId() {
        return this._userId; // Return the stored user ID
    }
}
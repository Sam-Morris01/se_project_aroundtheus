export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    _handleError(err) {
      console.error(err);
    }
  
    // User routes
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    updateUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name, about }),
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    updateAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar }),
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    // Card routes
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    createCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  
    dislikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(this._handleResponse)
        .catch(this._handleError);
    }
  }
  

  
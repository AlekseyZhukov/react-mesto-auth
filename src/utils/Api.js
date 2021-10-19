

class Api {
    constructor(config) {
        this.mainUrl = config.mainUrl;
        this.headers = config.headers;
    }

    getInitialCards() {
        return fetch(this.mainUrl + 'cards',
            { headers: this.headers })
            .then(this._getResponseData)
    }

    getUserInfo() {
        return fetch(this.mainUrl + 'users/me', {
            headers: this.headers
        })
        .then(this._getResponseData)

    }
    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
      }

    changeUserInfo(data) {
        return fetch(this.mainUrl + 'users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getResponseData)
    }

    changeUserAvatar(data) {
        return fetch(this.mainUrl + 'users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,

            })
        })
        .then(this._getResponseData)
    }

    newCardAdd(url, data) {
        return fetch(this.mainUrl + url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getResponseData)

    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._getResponseData)
    }
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
          return this.likeRemove(`cards/likes/${id}`);
        } else {
          return this.likeAdd(`cards/likes/${id}`);
        }
      }

    likeAdd(url) {
        return fetch(this.mainUrl + url, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this._getResponseData)
    }

    likeRemove(url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._getResponseData)      
    }
    
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

}

export const api = new Api({
    mainUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
    headers: {
      authorization: '6d5ca00d-91ba-48f8-98c4-b38aa97b3c19',
      'Content-Type': 'application/json'
    }
  });





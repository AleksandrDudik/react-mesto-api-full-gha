class Api {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
      return fetch(this._url + '/cards', {
              method: 'GET',
              headers: this._headers
          })
          .then(this._checkResponse);
  }

  getApiUserInfo() {
      return fetch(this._url + '/users/me', {
              method: 'GET',
              headers: this._headers
          })
          .then(this._checkResponse);
  }

  setApiUserInfo(data) {
      return fetch(this._url + '/users/me', {
              method: 'PATCH',
              headers: this._headers,
              body: JSON.stringify({
                  name: data.name,
                  about: data.about
              })
          })
          .then(this._checkResponse);
  }

  postCards(data) {
      return fetch(this._url + '/cards', {
              method: 'POST',
              headers: this._headers,
              body: JSON.stringify({
                  name: data.name,
                  link: data.link
              })
          })
          .then(this._checkResponse);
  }

  deleteCard(data) {
      return fetch(this._url + `/cards/${data}`, {
              method: 'DELETE',
              headers: this._headers,
          })
          .then(this._checkResponse);
  }

  setAvatar(data) {
      return fetch(this._url + '/users/me/avatar', {
              method: 'PATCH',
              headers: this._headers,
              body: JSON.stringify({
                  avatar: data.avatar
              })
          })
          .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

  deleteLike(data) {
      return fetch(this._url + `/cards/likes/${data}`, {
              method: 'DELETE',
              headers: this._headers,
          })
          .then(this._checkResponse);
  }

}


export const api = new Api({
  url: 'https://api.dudik.nomoredomainsicu.ru',
  headers: {
      'Accept': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
  },
});
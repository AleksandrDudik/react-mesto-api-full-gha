class Api {
  constructor(config) {
      this._url = config.url;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Œ¯Ë·Í‡: ${res.status}`);
  }

  getCards(token) {
      return fetch(this._url + '/cards', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              }
          })
          .then(this._checkResponse);
  }

  getApiUserInfo() {
      return fetch(this._url + '/users/me', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              }
          })
          .then(this._checkResponse);
  }

  setApiUserInfo(data) {
      return fetch(this._url + '/users/me', {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
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
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
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
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              }
          })
          .then(this._checkResponse);
  }

  setAvatar(data) {
      return fetch(this._url + '/users/me/avatar', {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
              body: JSON.stringify({
                  avatar: data.avatar
              })
          })
          .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(this._checkResponse);
    }

  deleteLike(data) {
      return fetch(this._url + `/cards/likes/${data}`, {
              method: 'DELETE',
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              }
          })
          .then(this._checkResponse);
  }

}


export const api = new Api({ url: 'https://api.dudik.nomoredomainsicu.ru' });
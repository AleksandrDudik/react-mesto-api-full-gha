class Api {
  constructor(config) {
      this._url = config.url;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards(token) {
      return fetch(this._url + '/cards', {
              method: 'GET',
              headers: { authorization: `Bearer ${token}`}
          })
          .then(this._checkResponse);
  }

  getApiUserInfo(token) {
      return fetch(this._url + '/users/me', {
              method: 'GET',
              headers: { authorization: `Bearer ${token}`}
          })
          .then(this._checkResponse);
  }

  setApiUserInfo(data, token) {
      return fetch(this._url + '/users/me', {
              method: 'PATCH',
              headers: { authorization: `Bearer ${token}`},
              body: JSON.stringify({
                  name: data.name,
                  about: data.about
              })
          })
          .then(this._checkResponse);
  }

  postCards(data, token) {
      return fetch(this._url + '/cards', {
              method: 'POST',
              headers: { authorization: `Bearer ${token}`},
              body: JSON.stringify({
                  name: data.name,
                  link: data.link
              })
          })
          .then(this._checkResponse);
  }

  deleteCard(data, token) {
      return fetch(this._url + `/cards/${data}`, {
              method: 'DELETE',
              headers: { authorization: `Bearer ${token}`},
          })
          .then(this._checkResponse);
  }

  setAvatar(data, token) {
      return fetch(this._url + '/users/me/avatar', {
              method: 'PATCH',
              headers: { authorization: `Bearer ${token}`},
              body: JSON.stringify({
                  avatar: data.avatar
              })
          })
          .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: { authorization: `Bearer ${token}`},
        })
            .then(this._checkResponse);
    }

  deleteLike(data, token) {
      return fetch(this._url + `/cards/likes/${data}`, {
              method: 'DELETE',
              headers: { authorization: `Bearer ${token}`},
          })
          .then(this._checkResponse);
  }

}


export const api = new Api({
  url: 'https://api.dudik.nomoredomainsicu.ru',
  headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
  },
});
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ( password, email ) => {
  return fetch(
    `${BASE_URL}/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: password, email: email })
    }
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
}

export const authorize = ( password, email ) => {
  return fetch(
    `${BASE_URL}/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: password, email: email })
    }
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      return;
    })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          throw new Error('Токен не передан или передан не в том формате');
        }
        if (res.status === 401) {
          throw new Error('Переданный токен некорректен');
        }
      }
      catch (e) {
        return e;
      }
    })
    .then(data => {
      return data;
    })
    .catch((err) => {return Promise.reject(err.message)});
}
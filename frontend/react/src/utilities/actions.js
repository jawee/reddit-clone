import * as Constants from './constants';

export function fetchResource(endpoint, id = null) {
  let url = Constants.BASE_URL + Constants.API_URL + endpoint;

  if(id !== null && id !== undefined) {
    url += '/' + id;
  }

  return fetch(url).then(res => res.json());
}

export function getUsernameFromId(uid) {
  return fetchResource(Constants.USER_ENDPOINT, uid);
}

export function fetchLogin(email, password) {

  let url = Constants.BASE_URL + Constants.API_URL + Constants.AUTH_ENDPOINT + '/login';

  let user = { 'email': email, 'password': password };

  console.log(user);
  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(user)
  }
  )
    .then(res => {
      if(res.ok) {
        return res;
      } else {
        throw Error('Wrong email or password.');
      }
    })
    .then(res => res.json());
}

export function fetchSignup(username, email, password) {

  //AUTH_ENDPOINT + '/signup'
  //
}

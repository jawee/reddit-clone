import * as Constants from './constants';

export function fetchResource(endpoint, id) {
  let url = Constants.BASE_URL + Constants.API_URL + endpoint;

  if(id !== null) {
    url += '/' + id;
  }

  return fetch(url).then(res => res.json());
}

export function getUsernameFromId(uid) {
  return fetchResource(Constants.USER_ENDPOINT, uid);
}

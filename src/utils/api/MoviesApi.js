import { BASE_URL_MOVIES_API } from "../constants";

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  };

  _checkResponse(res) {
    return (res.ok)
      ? res.json()
      : Promise.reject(res.json());
  };

  download() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
    })
      .then(this._checkResponse)
  };
};

const moviesApi = new MoviesApi({ baseUrl: BASE_URL_MOVIES_API });

export default moviesApi;

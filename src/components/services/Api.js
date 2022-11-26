class Api {
  #API_KEY = '30276048-16573eea29badaa0e06e574a5';
  #URL = 'https://pixabay.com/api/';

  constructor() {
    this.perPage = 12;
  }

  async fetchImages(query, page = 1) {
    const queryString = `${this.#URL}?q=${query}&page=${page}&key=${
      this.#API_KEY
    }&image_type=photo&orientation=horizontal&per_page=${this.perPage}`;
    const response = await fetch(queryString);

    if (!response.ok) {
      throw new Error('No images for your request. Please, try again.');
    }

    return await response.json();
  }
}

export default Api;

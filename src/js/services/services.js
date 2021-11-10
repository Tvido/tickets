const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
const BASE_URL = 'https://app.ticketmaster.com';

export default class EventsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.size = 20;
    this.country = '';
  }

  async fetchEvent() {
    let url = '';
    if (this.country !== '') {
      url = `${BASE_URL}/discovery/v2/events.json?size=${this.size}&countryCode=${this.country}&page=${this.page}&apikey=${API_KEY}`;
    } else {
      if (this.searchQuery !== '') {
        url = `${BASE_URL}/discovery/v2/events.json?size=${this.size}&keyword=${this.searchQuery}&page=${this.page}&apikey=${API_KEY}`;
      } else {
        url = `${BASE_URL}/discovery/v2/events.json?size=${this.size}&page=${this.page}&apikey=${API_KEY}`;
      }
    }

    const rawResult = await fetch(url);
    if (!rawResult.ok) {
      throw rawResult;
    }

    const result = await rawResult.json();
    // console.log(result);
    // зразу повертаємо масив подій
    return result._embedded.events;
  }

  async fetchPages() {
    let url = '';
    if (this.country) {
      url = `${BASE_URL}/discovery/v2/events.json?size=${this.size}&countryCode=${this.country}&apikey=${API_KEY}`;
    } else {
      if (this.searchQuery !== '') {
        url = `${BASE_URL}/discovery/v2/events.json?size=${this.size}&keyword=${this.searchQuery}&apikey=${API_KEY}`;
      } else {
        url = `${BASE_URL}/discovery/v2/events.json?size=${this.size}&apikey=${API_KEY}`;
      }
    }
    const rawResult = await fetch(url);
    if (!rawResult.ok) {
      throw rawResult;
    }

    const result = await rawResult.json();
    // console.log(result);

    // зразу повертаємо масив pages
    return result.page.totalElements;
  }

  changeCountry(newCountry) {
    this.country = newCountry;
  }
  changePage(newPage) {
    this.page = newPage;
  }
  changeSize(newSize) {
    this.size = newSize;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export default class Datasource {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  getPrices() {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then((response) => { return response.json() })
        .then((data) => resolve(data))
        .catch(e => reject(e))
    })
  }
}
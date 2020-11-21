// const { default: Header } = require('../components/header/header');

class NaverAPI {
  constructor() {

    this.myHeaders = new Headers();
    this.myHeaders.append("X-Naver-Client-Secret", "bY8fhZxK4C");
    this.myHeaders.append("X-Naver-Client-Id", "0G60QJQ4IvliZC3X0lTP");

    this.getRequestOptions = {
      method: 'GET',
      headers: this.myHeaders,
      redirect: 'follow'
    };
  }
  async search() {
    const response = await fetch(
      "https://openapi.naver.com/v1/search/movie.json?query=반도&display=10",
      this.getRequestOptions
    );
    const result = await response.json();
    return result.results;
  }
}
export default NaverAPI;
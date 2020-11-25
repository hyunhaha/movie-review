class MovieDB {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: "GET",
      redirect: "follow",
    };
  }
  async mostPopular() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&sort_by=popularity.desc&region=KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.results;
  }
  async search(query) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.results;
  }
  async movieDetail(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&api_key=70cdbfae5467ca38809a62f0d5f139ff`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result;

  };
  async credits(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR&api_key=70cdbfae5467ca38809a62f0d5f139ff`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result;
  }
}
export default MovieDB;
class MovieDB {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: "GET",
      redirect: "follow",
    };
  }
  async mostPopular(page) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&sort_by=popularity.desc&region=KR&api_key=${this.key}&page=1`,
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
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result;

  };
  async credits(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result;
  }
  async mostTvPopular() {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=ko-KR&sort_by=popularity.desc&region=KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.results;
  };
  async tvDetail(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=ko-KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result;

  };
  async tvCredits(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?language=ko-KR&api_key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result;
  }

}
export default MovieDB;
import MovieDB from './movieDB';

const movieList = []
const TVList = []
const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);

const listBuilder = async (page, type) => {
  console.log(type)
  if (type === 'movie') return await movieDB.mostPopular(page);
  else if (type === 'tv') return await movieDB.mostTvPopular(page)
}
export const getMovieList = (page = 1, type) => {
  if (!movieList[page]) {
    movieList[page] = listBuilder(page, type);
  }
  return movieList[page]
}
export const getTVList = (page = 1, type) => {
  if (!TVList[page]) {
    TVList[page] = listBuilder(page, type);
  }
  return TVList[page]
}


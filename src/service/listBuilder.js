import MovieDB from './movieDB';

const movieList = [];
const TVList = [];
// const searchList = [];
const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);

const listBuilder = async (page, type) => {
  if (type === 'movie') return await movieDB.mostPopular(page);
  else if (type === 'tv') return await movieDB.mostTvPopular(page);
  else if (type === 'search') return await movieDB.search(page);
}
const searchListBuilder = async (page, searchWord) => {
  return await movieDB.search(searchWord)
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
    console.log(TVList)
  }
  return TVList[page]
}

export const getSearchList = (page, searchWord) => {
  console.log(searchWord)
  let searchList = searchListBuilder(page, searchWord)



  return searchList;
}
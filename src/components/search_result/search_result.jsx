import React from "react";
import MovieList from "../movie_list/movie_list";
import styles from "./search_result.module.css";
const SearchResult = ({ movies }) => {
  return (
    <div className={styles.movie}>
      {movies.length !== 0 ? (
        <MovieList movies={movies} />
      ) : (
        <h1>검색 결과가 없습니다.</h1>
      )}
    </div>
  );
};

export default SearchResult;

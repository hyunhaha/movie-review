import React, { useState } from "react";
import { useEffect } from "react";

import MovieList from "../movie_list/movie_list";
import SearchBar from "../search_bar/search_bar";
import styles from "./search_result.module.css";
const SearchResult = ({ movies, movieDB }) => {
  const [searchbar, setSearchbar] = useState(
    window.innerWidth <= 425 ? true : false
  );
  const [moviesInSmall, setMoviesInSmall] = useState([]);
  useEffect(() => {
    let mounted = true;
    const handleResize = () => {
      const windowWidth = window.innerWidth <= 425;
      if (windowWidth) {
        setSearchbar(true);
      } else {
        setSearchbar(false);
      }
    };
    window.addEventListener("resize", () => {
      mounted && handleResize();
    });
    return () => {
      mounted = false;
    };
  }, []);
  const onSearch = query => {
    movieDB
      .search(query) //
      .then(items => {
        setMoviesInSmall(items);
      });
  };
  return (
    <div className={styles.movie}>
      {searchbar ? (
        <div>
          <div className={styles.searchbarWrap}>
            <SearchBar onSearch={onSearch} />
          </div>
          {moviesInSmall.length === 0 ? (
            <h1>검색 결과가 없습니다.</h1>
          ) : (
            <MovieList movies={moviesInSmall} />
          )}
        </div>
      ) : movies.length === 0 ? (
        <h1>검색 결과가 없습니다.</h1>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default SearchResult;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB, authService }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let mounted = true;
    movieDB
      .mostPopular() //
      .then(items => {
        mounted && setMovies(items);
      });
    return () => (mounted = false);
  }, [movieDB]);

  return (
    <div className={styles.main}>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화 순위</h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MainPage;

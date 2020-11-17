import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieDB
      .mostPopular() //
      .then(items => {
        setMovies(items);
      });
  }, [movieDB]);
  return (
    <div>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화 순위</h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MainPage;

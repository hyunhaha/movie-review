import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB, authService }) => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  useEffect(() => {
    let mounted = true;
    movieDB
      .mostPopular(1) //
      .then(items => {
        mounted && setMovies(items);
      });

    return () => (mounted = false);
  }, [movieDB]);
  console.log(movies);
  useEffect(() => {
    let mounted = true;
    movieDB
      .mostTvPopular() //
      .then(items => {
        mounted && setTv(items);
      });
    return () => (mounted = false);
  }, [movieDB]);
  return (
    <div className={styles.main}>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화</h1>
        <MovieList items={movies} />
      </div>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>tv</h1>
        <MovieList items={tv} />
      </div>
    </div>
  );
};

export default MainPage;

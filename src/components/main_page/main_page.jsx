import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB, authService }) => {
  const [movies, setMovies] = useState([]);
  const [login, setLogin] = useState(false);
  const historyState = useHistory().state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  useEffect(() => {
    movieDB
      .mostPopular() //
      .then(items => {
        setMovies(items);
      });
  }, [movieDB]);
  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setLogin(true);
        setUserId(user.uid);
      } else {
        setLogin(false);
      }
    });
  });

  return (
    <div className={styles.main}>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화 순위</h1>
        <MovieList movies={movies} />
      </div>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화 순위</h1>
        <MovieList movies={movies} />
      </div>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화 순위</h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MainPage;

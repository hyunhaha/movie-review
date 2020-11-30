import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB, authService }) => {
  const [movies, setMovies] = useState([]);

  // const historyState = useHistory().state;
  // const [userId, setUserId] = useState(historyState && historyState.id);
  useEffect(() => {
    let mounted = true;
    movieDB
      .mostPopular() //
      .then(items => {
        mounted && setMovies(items);
      });
    return () => (mounted = false);
  }, [movieDB]);
  // useEffect(() => {
  //   let mounted = true;
  //   authService.onAuthChange(user => {
  //     if (user && mounted) {
  //       setUserId(user.uid);
  //     } else {
  //     }
  //   });
  //   return () => (mounted = false);
  // }, [authService]);

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

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FetchMore from "../fetch_more/fetch_more";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB, authService }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await movieDB.mostPopular(page); //
      setMovies(prev => [...prev, ...response]);
    }
    setLoading(true);
    fetchData();
    setLoading(false);
    // .then(items => {
    //   console.log(items);
    //   mounted && setMovies(items);
    // });
  }, [movieDB, page]);
  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  // console.log(movies);

  useEffect(() => {
    let mounted = true;
    movieDB
      .mostTvPopular() //
      .then(items => {
        mounted && setTv(items);
      });
    return () => (mounted = false);
  }, [movieDB]);
  // console.log(tv);
  return (
    <div className={styles.main}>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화</h1>
        <MovieList
          items={movies}
          page={page}
          loading={loading}
          setPage={setPage}
        />
        {/* <FetchMore loading={page !== 1 && loading} setPage={setPage} /> */}
      </div>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>tv</h1>
        {/* <MovieList items={tv} /> */}
      </div>
    </div>
  );
};

export default MainPage;

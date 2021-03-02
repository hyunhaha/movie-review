import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getMovieList, getTVList } from "../../service/listBuilder";
import { dummyFetcher } from "../../service/util";
import MovieList from "../movie_list/movie_list";
import styles from "./main_page.module.css";
const MainPage = ({ movieDB }) => {
  const [movieLoading, setMovieLoading] = useState(false);
  const [tvLoading, setTvLoading] = useState(false);
  const [moviePage, setMoviePage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [tvPage, setTvPage] = useState(1);
  const [tv, setTv] = useState([]);

  useEffect(() => {
    console.log(moviePage);
    async function fetchData() {
      const response = await dummyFetcher(getMovieList, moviePage, "movie"); //
      //  movieDB.mostPopular(moviePage)
      setMovies(prev => [...prev, ...response]);
    }
    setMovieLoading(true);
    fetchData();
    setMovieLoading(false);
  }, [movieDB, moviePage]);

  useEffect(() => {
    async function fetchData() {
      const response = await dummyFetcher(getTVList, tvPage, "tv");
      if (response) setTv(prev => [...prev, ...response]);
    }
    setTvLoading(true);
    fetchData();
    setTvLoading(false);
  }, [movieDB, tvPage]);

  return (
    <div className={styles.main}>
      <nav>
        <div>영화</div>
        <div>tv</div>
      </nav>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>영화</h1>
        <MovieList
          items={movies}
          loading={moviePage !== 1 && movieLoading}
          setPage={setMoviePage}
        />
      </div>
      <div className={styles.movie_chart}>
        <h1 className={styles.title}>tv</h1>
        <MovieList
          items={tv}
          loading={tvPage !== 1 && tvLoading}
          setPage={setTvPage}
        />
      </div>
    </div>
  );
};

export default MainPage;

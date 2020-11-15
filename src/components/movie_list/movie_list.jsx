import React from "react";
import MoiveItem from "../movie_item/moive_item";
import styles from "./movie_list.module.css";
const MovieList = ({ movies }) => (
  <div className={styles.movie_chart}>
    <h1>영화 순위</h1>
    <ul className={styles.list}>
      {movies.map((movie, index) => (
        <MoiveItem key={movie.id} movie={movie} ranking={index} />
      ))}
    </ul>
  </div>
);

export default MovieList;

import React from "react";
import MoiveItem from "../movie_item/moive_item";
import styles from "./movie_list.module.css";
const MovieList = ({ movies }) => (
  <ul className={styles.list}>
    {movies.map((movie, index) => (
      <MoiveItem key={movie.id} movie={movie} ranking={index} />
    ))}
  </ul>
);

export default MovieList;

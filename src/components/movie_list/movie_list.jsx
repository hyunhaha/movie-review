import React from "react";
import MoiveItem from "../movie_item/movie_item";
import styles from "./movie_list.module.css";
const MovieList = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((movie, index) => (
        <MoiveItem key={movie.id} movie={movie} ranking={index} />
      ))}
    </ul>
  );
};

export default MovieList;

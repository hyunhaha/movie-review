import React, { useEffect, useState } from "react";
import FetchMore from "../fetch_more/fetch_more";
import MoiveItem from "../movie_item/movie_item";
import styles from "./movie_list.module.css";
const MovieList = ({ items, loading, setPage, page }) => {
  return (
    <ul className={styles.list}>
      {items.map((movie, index) => (
        <MoiveItem key={movie.id} movie={movie} ranking={index} />
      ))}
      <li className={styles.fetch}>
        <FetchMore loading={page !== 1 && loading} setPage={setPage} />
      </li>
    </ul>
  );
};

export default MovieList;

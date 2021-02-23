import React, { useEffect, useState } from "react";
import FetchMore from "../fetch_more/fetch_more";
import MoiveItem from "../movie_item/movie_item";
import styles from "./movie_list.module.css";
const MovieList = ({ items, page, loading, setPage }) => {
  // const [count, setCount] = useState(page);
  // useEffect(() => {
  //   setPage(count);
  // }, [count]);
  return (
    <ul className={styles.list}>
      {items.map((movie, index) => (
        <MoiveItem key={movie.id} movie={movie} ranking={index} />
      ))}
      <li className={styles.buttonItem}>
        <FetchMore loading={page !== 1 && loading} setPage={setPage} />
        {/* <button className={styles.button}>더보기</button> */}
      </li>
    </ul>
  );
};

export default MovieList;

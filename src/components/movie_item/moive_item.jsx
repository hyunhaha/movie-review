import React from "react";
import styles from "./movie_item.module.css";
import { Link } from "react-router-dom";

const MoiveItem = ({ movie, ranking }) => {
  const { poster_path, release_date, id, title, vote_average } = movie;
  const url = "https://image.tmdb.org/t/p/w500" + poster_path;
  const date_arr = release_date.split("-");

  return (
    <Link to={`/detail/${id}`}>
      <li className={styles.item}>
        <div className={styles.imagestandard}>
          <img className={styles.image} src={url} alt="poster" />
        </div>
        <div className={styles.rank}>{ranking + 1}</div>
        <h1 className={styles.title}>{title}</h1>
        {/* <p>{movie.overview}</p> */}
        <p className={styles.release_date}>{`${date_arr[0]} • 평점 ${
          vote_average / 2
        }`}</p>
      </li>
    </Link>
  );
};

export default MoiveItem;

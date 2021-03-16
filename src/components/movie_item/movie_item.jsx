import React from "react";
import styles from "./movie_item.module.css";
import { useHistory } from "react-router-dom";

const MoiveItem = ({ movie, ranking }) => {
  const history = useHistory();
  const {
    poster_path,
    release_date,
    id,
    title,
    vote_average,
    first_air_date,
    name,
  } = movie;
  const url = "https://image.tmdb.org/t/p/w500" + poster_path;
  const date_arr = (release_date || first_air_date).split("-");
  const onClick = () => {
    title
      ? history.push(`/movie/detail/${id}`)
      : history.push(`/tv/detail/${id}`);
  };
  return (
    <li className={styles.item} onClick={onClick}>
      <div className={styles.rank}>{ranking + 1}</div>
      <div className={styles.imagestandard}>
        <img className={styles.image} src={url} alt="poster" />
      </div>
      <div className={styles.detail}>
        <h1 className={styles.title}>{title || name}</h1>
        <p className={styles.release_date}>
          {`${date_arr[0] || undefined} • 평점 ${(vote_average / 2).toFixed(
            1
          )}`}
        </p>
      </div>
    </li>
  );
};

export default MoiveItem;

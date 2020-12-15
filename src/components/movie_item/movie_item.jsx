import React from "react";
import styles from "./movie_item.module.css";
import { useHistory } from "react-router-dom";

const MoiveItem = ({ movie, ranking }) => {
  const history = useHistory();
  const { poster_path, release_date, id, title, vote_average } = movie;
  const { first_air_date, name } = movie;
  const url = "https://image.tmdb.org/t/p/w500" + poster_path;
  const date_arr = (release_date || first_air_date).split("-");
  const onClick = () => {
    title
      ? history.push(`/movie/detail/${id}`)
      : history.push(`/tv/detail/${id}`);
  };
  return (
    // <Link to={`/detail/${id}`}>
    <li className={styles.item} onClick={onClick}>
      <div className={styles.imagestandard}>
        <img className={styles.image} src={url} alt="poster" />
      </div>
      <div className={styles.rank}>{ranking + 1}</div>
      <h1 className={styles.title}>{title || name}</h1>
      {/* <p>{movie.overview}</p> */}
      <p className={styles.release_date}>{`${date_arr[0]} • 평점 ${
        vote_average / 2
      }`}</p>
    </li>
    // </Link>
  );
};

export default MoiveItem;

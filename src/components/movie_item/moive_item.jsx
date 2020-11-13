import React from "react";
import styles from "./movie_item.module.css";
import cogoToast from "cogo-toast";
import { Link, useHistory } from "react-router-dom";

const MoiveItem = ({ movie, ranking }) => {
  const history = useHistory();
  const url = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const date_arr = movie.release_date.split("-");
  const onButtonClick = () => {
    const { hide } = cogoToast.success("This is a success message.hahaha", {
      onClick: () => {
        hide();
      },
      position: "top-left",
      heading: "성공이닷",
    });
  };
  const onItemClick = () => {
    history.push(`/detail/${movie.id}`);
  };
  return (
    <li onClick={onItemClick} className={styles.item}>
      <div className={styles.rank}>{ranking + 1}</div>
      <div className={styles.imagestandard}>
        <img className={styles.image} src={url} alt="poster" />
      </div>
      <h1 className={styles.title}>{movie.title}</h1>
      {/* <p>{movie.overview}</p> */}
      <p className={styles.release_date}>{`${date_arr[0]} • ${date_arr[1]}`}</p>
      <button onClick={onButtonClick}>gogo</button>
    </li>
  );
};

export default MoiveItem;

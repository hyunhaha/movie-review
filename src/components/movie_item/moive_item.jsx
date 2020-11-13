import React from "react";
import styles from "./movie_item.module.css";
import cogoToast from "cogo-toast";

const MoiveItem = ({ movie, ranking }) => {
  const url = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const date_arr = movie.release_date.split("-");
  const onClick = () => {
    const { hide } = cogoToast.success("This is a success message.hahaha", {
      onClick: () => {
        hide();
      },
      position: "top-left",
      heading: "성공이닷",
    });
  };
  return (
    <li className={styles.item}>
      <div className={styles.rank}>{ranking + 1}</div>
      <div className={styles.imagestandard}>
        <img className={styles.image} src={url} alt="poster" />
      </div>
      <h1 className={styles.title}>{movie.title}</h1>
      {/* <p>{movie.overview}</p> */}
      <p className={styles.release_date}>{`${date_arr[0]} • ${date_arr[1]}`}</p>
      <button onClick={onClick}>gogo</button>
    </li>
  );
};

export default MoiveItem;

import React from "react";
import styles from "./poster.module.css";

const Poster = ({ detail, onReviewClick }) => {
  const posterURL = "https://image.tmdb.org/t/p/w500" + detail.poster_path;
  const onClick = () => {
    onReviewClick(true);
  };
  return (
    <div className={styles.posterPartWrap}>
      <div className={styles.poster_title}>
        <div className={styles.poster_div}>
          <img
            className={styles.poster_image}
            src={detail.poster_path ? posterURL : null}
            alt="poster"
          />
        </div>
        <h1 className={styles.title}>{detail.title || detail.name}</h1>
        <p className={styles.movie_detail}>{`${
          (detail.release_date ? detail.release_date.split("-")[0] : "") ||
          (detail.first_air_date ? detail.first_air_date.split("-")[0] : "")
        } ・ ${
          detail.production_countries &&
          (detail.production_countries[0]
            ? detail.production_countries[0].name
            : "")
        } ・ ${detail.genres && detail.genres[0].name}`}</p>

        <p className={styles.rating}>{`평점 ${detail.vote_average / 2}`}</p>
        <button className={styles.reviewButton} onClick={onClick}>
          리뷰쓰기
        </button>
      </div>
    </div>
  );
};

export default Poster;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./review_item.module.css";
const ReviewItem = ({ review, movieDB }) => {
  console.log(review.id);
  const [detail, setDetail] = useState([]);
  const posterUrl = "https://image.tmdb.org/t/p/w500" + detail.poster_path;
  useEffect(() => {
    movieDB.movieDetail(review.id).then(result => {
      setDetail(result);
    });
  }, [movieDB, review.id]);
  return (
    <li className={styles.item}>
      <div className={styles.imagestandard}>
        <img className={styles.image} src={posterUrl} alt="poster" />
      </div>
      <h1 className={styles.title}>{detail.title}</h1>
      {/* <p>{review.review_content}</p> */}
      <p className={styles.myRate}>나의평점 {review.rate}</p>
    </li>
  );
};

export default ReviewItem;

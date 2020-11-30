import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReviewPage from "../review_page/review_page";
import styles from "./review_item.module.css";
const ReviewItem = ({
  review,
  movieDB,
  reviewRepository,
  userId,
  FileInput,
}) => {
  const [detail, setDetail] = useState([]);
  const [modalState, setModalState] = useState(false);
  const posterUrl = "https://image.tmdb.org/t/p/w500" + detail.poster_path;
  useEffect(() => {
    movieDB.movieDetail(review.id).then(result => {
      setDetail(result);
    });
  }, [movieDB, review.id]);
  const onClick = () => {
    setModalState(true);
  };
  const modalOff = () => {
    setModalState(false);
  };

  return (
    <div className={styles.itemWrap}>
      <li className={styles.item} onClick={onClick}>
        <div className={styles.imagestandard}>
          <img
            className={styles.image}
            src={detail.poster_path ? posterUrl : null}
            alt="poster"
          />
        </div>
        <h1 className={styles.title}>{detail.title}</h1>
        {/* <p>{review.review_content}</p> */}
        <p className={styles.myRate}>나의평점 {review.rate}</p>
      </li>
      {modalState && (
        <ReviewPage
          modalOff={modalOff}
          reviewRepository={reviewRepository}
          movieId={review.movie_id}
          userId={userId}
          FileInput={FileInput}
        />
      )}
    </div>
  );
};

export default ReviewItem;

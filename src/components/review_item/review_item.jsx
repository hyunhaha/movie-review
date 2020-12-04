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
  onDelete,
}) => {
  const [detail, setDetail] = useState([]);
  const [modalState, setModalState] = useState(false);
  const { id, fileURL } = review;
  const posterUrl = "https://image.tmdb.org/t/p/w500" + detail.poster_path;

  useEffect(() => {
    movieDB.movieDetail(id).then(result => {
      setDetail(result);
    });
  }, [movieDB, id]);

  const onClick = () => {
    setModalState(true);
  };

  const modalOff = () => {
    setModalState(false);
  };
  const onDeleteClick = () => {
    onDelete(review);
  };

  return (
    <div className={styles.itemWrap}>
      <li className={styles.item}>
        <div className={styles.posterWrap}>
          <img
            className={styles.poster}
            src={detail.poster_path ? posterUrl : null}
            alt="poster"
          />
          {fileURL && (
            <div className={styles.reviewimgWrap}>
              <div className={styles.photoCard}>
                <img
                  className={styles.reviewImg}
                  src={review.fileURL}
                  alt="review"
                />
              </div>
            </div>
          )}
        </div>

        <h1 className={styles.title}>{detail.title}</h1>
        <p className={styles.myRate}>나의평점 {review.rate}</p>
        <button className={styles.button} onClick={onClick}>
          리뷰열기
        </button>
        <button className={styles.button} onClick={onDeleteClick}>
          삭제
        </button>
      </li>
      {modalState && (
        <ReviewPage
          modalOff={modalOff}
          reviewRepository={reviewRepository}
          movieId={id}
          userId={userId}
          FileInput={FileInput}
        />
      )}
    </div>
  );
};

export default ReviewItem;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ImageCard from "../image_card/image_card";
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
  const { id, fileURL, contentType } = review;
  const posterUrl = "https://image.tmdb.org/t/p/w500" + detail.poster_path;

  useEffect(() => {
    if (contentType === "movie") {
      movieDB.movieDetail(id).then(result => {
        setDetail(result);
      });
    } else if (contentType === "tv") {
      movieDB.tvDetail(id).then(result => {
        setDetail(result);
      });
    }
  }, [movieDB, id, contentType]);

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
        {/* <div className={styles.posterWrap}>
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
        </div> */}

        <ImageCard
          poster={detail.poster_path ? posterUrl : null}
          uploadImg={fileURL}
        />
        <h1 className={styles.title}>{detail.title || detail.name}</h1>
        <p className={styles.myRate}>나의평점 {review.rate}</p>
        <div className={styles.buttonWrap}>
          <button className={styles.button} onClick={onClick}>
            리뷰열기
          </button>
          <button className={styles.deleteButton} onClick={onDeleteClick}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </li>
      {modalState && (
        <ReviewPage
          modalOff={modalOff}
          reviewRepository={reviewRepository}
          movieId={id}
          userId={userId}
          FileInput={FileInput}
          contentType={contentType}
        />
      )}
    </div>
  );
};

export default ReviewItem;

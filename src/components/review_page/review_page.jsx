import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import StarRating from "../star_rating/star_rating";
import styles from "./review_page.module.css";
const ReviewPage = ({
  modalOff,
  reviewRepository,
  movieId,
  userId,
  posterImagePath,
}) => {
  const formRef = useRef();
  const reviewRef = useRef();
  const [rate, setRate] = useState(null);
  const [review, setReview] = useState();

  useEffect(() => {
    if (!userId) return;
    const stopSync = reviewRepository.syncReview(userId, reviews => {
      setReview(reviews[movieId]);
    });
    return () => stopSync();
  }, [reviewRepository, userId, movieId]);
  const onCloseClick = () => {
    modalOff();
  };

  const onChange = event => {
    if (event.currentTarget === null) {
      return;
    }
    event.preventDefault();

    const review = {
      id: movieId,
      movie_id: movieId,
      edit_date: Date.now() || "",
      review_content: reviewRef.current.value || "",
      rate: rate || 0,
    };
    console.log(review);
    addOrUpdateCard(review);
    reviewRef.current.value = review.review_content;
  };

  const addOrUpdateCard = review => {
    reviewRepository.saveReview(userId, review);
  };

  const onSetRate = value => {
    setRate(value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.review_container}>
        <button className={styles.closeButton} onClick={onCloseClick}>
          x
        </button>
        <h1 className={styles.header}>리뷰페이지</h1>
        <div className={styles.star}>
          <StarRating
            userId={userId}
            setRate={onSetRate}
            value={review && review.rate}
            onChange={onChange}
          />
        </div>
        <form className={styles.form} ref={formRef}>
          <textarea
            className={styles.reviewContent}
            ref={reviewRef}
            name="review_content"
            value={review && review.review_content}
            onChange={onChange}
            placeholder="리뷰를 작성해주세요"
          ></textarea>
          <button className={styles.saveButton} onClick={onChange}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

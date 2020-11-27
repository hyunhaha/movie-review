import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import StarRating from "../star_rating/star_rating";
import styles from "./review_page.module.css";
import cogoToast from "cogo-toast";

const ReviewPage = ({
  modalOff,
  reviewRepository,
  movieId,
  userId,
  posterImagePath,
}) => {
  const formRef = useRef();
  const reviewRef = useRef();
  const [rate, setRate] = useState(0);
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

  useEffect(() => {
    setRate(review && review.rate);
  }, [review]);
  const addOrUpdateCard = review => {
    reviewRepository.saveReview(userId, review);
  };
  const setReviewData = () => {
    const review = {
      id: movieId,
      movie_id: movieId,
      edit_date: Date.now() || "",
      review_content: reviewRef.current.value || "",
      rate: rate,
    };
    addOrUpdateCard(review);
    reviewRef.current.value = review.review_content;
  };
  const onChange = event => {
    if (event.currentTarget === null) {
      return;
    }
    event.preventDefault();
    setReviewData();
  };
  const onSaveClick = event => {
    event.preventDefault();
    setReviewData();
    const { hide } = cogoToast.success("평점과 리뷰가 저장되었습니다.", {
      onClick: () => {
        hide();
      },
      position: "top-center",
    });
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
          <button className={styles.saveButton} onClick={onSaveClick}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

import React from "react";
import { useState } from "react";
import { useRef } from "react";
import StarRating from "../star_rating/star_rating";
import styles from "./review_page.module.css";
const ReviewPage = ({ modalOff, reviewRepository, login, userId }) => {
  const formRef = useRef();
  const reviewRef = useRef();
  const [reviews, setReviews] = useState({});
  const [rate, setRate] = useState(null);
  const onCloseClick = () => {
    modalOff();
  };
  // const onChange = event => {
  //   if (event.currentTarget === null) {
  //     return;
  //   }
  //   event.preventDefault();
  //   // updateReview();
  // };
  const onsubmit = event => {
    event.preventDefault();
    const review = {
      id: Date.now(),
      edit_date: Date.now() || "",
      review_content: reviewRef.current.value || "",
      rate: rate,
    };
    console.log(review);
    // reviewRef.current.value = review.review_content;
    onAdd(review);
  };
  const onAdd = review => {
    setReviews(reviews => {
      const updated = { ...reviews };
      updated[review.id] = review;
      return updated;
    });
    reviewRepository.saveReview(userId, review);
  };
  const onSetRate = value => {
    setRate(value);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.review_container}>
        <h1 className={styles.header}>리뷰페이지</h1>
        <button onClick={onCloseClick}>x</button>
        <StarRating login={login} setRate={onSetRate} />
        <form ref={formRef}>
          <textarea ref={reviewRef} name="review" />
          <button onClick={onsubmit}>저장하기</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

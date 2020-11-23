import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import StarRating from "../star_rating/star_rating";
import styles from "./review_page.module.css";
const ReviewPage = ({
  modalOff,
  reviewRepository,
  authService,
  movieId,
  userId,
}) => {
  // const historyState = useHistory().state;
  // const [login, setLogin] = useState(false);

  // const [userId, setUserId] = useState(historyState && historyState.state);
  const formRef = useRef();
  const reviewRef = useRef();
  const [rate, setRate] = useState(null);
  const [review, setReview] = useState();
  // r const { review_content } = review;

  // useEffect(() => {
  //   authService.onAuthChange(user => {
  //     if (user) {
  //       console.log(login);
  //       console.log(userId);

  //       setUserId(user.uid);
  //     } else {
  //       console.log(login);

  //       setLogin(false);
  //     }
  //   });
  // }, [authService, userId, login]);

  useEffect(() => {
    if (!userId) return;
    const stopSync = reviewRepository.syncCard(userId, reviews => {
      setReview(reviews[movieId]);
    });
    return () => {
      stopSync();
    };
  }, [reviewRepository, userId, movieId]);
  const onCloseClick = () => {
    modalOff();
  };
  const addOrUpdateCard = review => {
    reviewRepository.saveReview(userId, review);
  };

  // const onSubmit = event => {
  //   event.preventDefault();
  //   const review = {
  //     id: movieId,
  //     movie_id: movieId,
  //     edit_date: Date.now() || "",
  //     review_content: reviewRef.current.value || "",
  //     rate: rate,
  //   };

  //   addOrUpdateCard(review);
  // };
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
  const onSetRate = value => {
    setRate(value);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.review_container}>
        <h1 className={styles.header}>리뷰페이지</h1>
        <button onClick={onCloseClick}>x</button>
        <StarRating userId={userId} setRate={onSetRate} />
        <form ref={formRef}>
          <textarea
            ref={reviewRef}
            name="review_content"
            value={review && review.review_content}
            onChange={onChange}
          ></textarea>
          <button onClick={onChange}>저장하기</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReviewItem from "../review_item/review_item";
import styles from "./my_review.module.css";
const MyReview = ({ reviewRepository, movieDB }) => {
  const [reviews, setReviews] = useState({});
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    if (!userId) {
      return;
    }
    const stopSync = reviewRepository.syncReview(userId, reviews => {
      setReviews(reviews);
    });

    return () => stopSync();
  }, [reviewRepository, userId]);
  console.log(reviews);
  return (
    <div>
      <h1 className={styles.title}>MyReview</h1>
      <ul className={styles.list}>
        {Object.keys(reviews).map(key => (
          <ReviewItem key={key} review={reviews[key]} movieDB={movieDB} />
        ))}
      </ul>
    </div>
  );
};

export default MyReview;

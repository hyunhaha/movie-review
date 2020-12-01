import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../loading/loading";
import ReviewItem from "../review_item/review_item";
import styles from "./my_review.module.css";

const MyReview = ({ reviewRepository, movieDB, authService, FileInput }) => {
  const history = useHistory();
  const [reviews, setReviews] = useState({});
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setUserId(localStorage.getItem("userId"));
    if (!userId) {
      return;
    }
    const stopSync = reviewRepository.syncReview(userId, reviews => {
      setReviews(reviews);
      setLoading(false);
    });
    console.log("reviews update");
    return () => stopSync();
  }, [reviewRepository, userId]);

  const onLogout = () => {
    authService.logout();
    window.localStorage.removeItem("userId");
    history.push("/");
  };

  return (
    <div className={styles.review}>
      <button className={styles.logoutButton} onClick={onLogout}>
        logout
      </button>
      <h1 className={styles.title}>My Reviews</h1>
      {loading ? (
        <Loading />
      ) : (
        <ul className={styles.list}>
          {Object.keys(reviews).map(key => (
            <ReviewItem
              key={key}
              review={reviews[key]}
              movieDB={movieDB}
              reviewRepository={reviewRepository}
              userId={userId}
              FileInput={FileInput}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReview;

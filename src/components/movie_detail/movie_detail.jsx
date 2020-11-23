import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewPage from "../review_page/review_page";

import styles from "./movie_detail.module.css";

const MovieDetail = ({ movieDB, reviewRepository }) => {
  const params = useParams();
  const history = useHistory();

  const [detail, setDetail] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    movieDB.movieDetail(params.id).then(result => {
      setDetail(result);
    });
    setUserId(localStorage.getItem("userId"));
  }, [movieDB, params.id]);

  const onReviewClick = () => {
    if (!userId) {
      history.push("/login");
      setModalState(false);
    } else {
      setModalState(true);
    }
  };
  const modalOff = () => {
    setModalState(false);
  };

  return (
    <div className={styles.detail}>
      <div className={styles.background_div}>
        <img
          className={styles.backgroundimage}
          src={
            detail && `https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`
          }
          alt="background"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.poster_title}>
          <div className={styles.poster_div}>
            <img
              className={styles.poster_image}
              src={
                detail && `https://image.tmdb.org/t/p/w500${detail.poster_path}`
              }
              alt="poster"
            />
          </div>
          <h1 className={styles.title}>{detail.title}</h1>
          <p className={styles.movie_detail}>{detail.release_date}</p>
          <p className={styles.rating}>{`평점 ${detail.vote_average / 2}`}</p>

          <button onClick={onReviewClick}>리뷰쓰기</button>
        </div>
      </div>
      {modalState && (
        <ReviewPage
          modalOff={modalOff}
          reviewRepository={reviewRepository}
          movieId={params.id}
          userId={userId}
        />
      )}
    </div>
  );
};

export default MovieDetail;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewPage from "../review_page/review_page";

import styles from "./movie_detail.module.css";

const MovieDetail = ({
  movieDB,
  authService,
  addReview,
  reviewRepository,
  userId,
}) => {
  const params = useParams();
  const history = useHistory();
  // const historyState = useHistory().state;
  // const [login, setLogin] = useState(false);
  // const [review, setReview] = useState();
  // const [userId, setUserId] = useState(historyState && historyState.state);
  const [detail, setDetail] = useState([]);
  const [modalState, setModalState] = useState(false);
  // console.log(historyState);
  // useEffect(() => {
  //   let mounted = true;

  //   authService.onAuthChange(user => {
  //     if (user) {
  //       console.log(login);
  //       // console.log(userId);
  //       setLogin(true);
  //       // setUserId(user.uid);
  //     } else {
  //       console.log(login);

  //       setLogin(false);
  //     }
  //   });
  //   return () => (mounted = false);
  // }, [authService, login]);

  // useEffect(() => {
  //   let mounted = true;
  //   if (!userId) {
  //     return;
  //   }
  //   const stopSync = reviewRepository.syncCard(userId, reviews => {
  //     console.log(review);
  //     setReview(reviews[movieId]);
  //   });

  //   return () => {
  //     stopSync();
  //     mounted = false;
  //   };
  // }, [reviewRepository, userId]);

  // console.log(review);

  useEffect(() => {
    movieDB.movieDetail(params.id).then(result => {
      setDetail(result);
    });
  }, [movieDB, params.id]);

  // title: result.title,
  // bgimage: "https://image.tmdb.org/t/p/w500" + result.backdrop_path,
  // poster_image: "https://image.tmdb.org/t/p/w500" + result.poster_path,
  // release_date: result.release_date,
  // production_countries: result.production_countries[0].name,
  // genre: result.genres[0].name,
  // vote_average: result.vote_average,
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
          onAdd={addReview}
          reviewRepository={reviewRepository}
          authService={authService}
          movieId={params.id}
          userId={userId}
        />
      )}
    </div>
  );
};

export default MovieDetail;

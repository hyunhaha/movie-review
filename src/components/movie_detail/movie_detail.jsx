import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewPage from "../review_page/review_page";
import StarRating from "../star_rating/star_rating";
import styles from "./movie_detail.module.css";

const MovieDetail = ({ movieDB, authService, addReview, reviewRepository }) => {
  const params = useParams();
  const history = useHistory();
  const historyState = useHistory().state;
  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState(historyState && historyState.state);
  const [detail, setDetail] = useState({
    title: "title",
    bgimage: null,
    poster_image: null,
    release_date: "",
    production_countries: "",
    genre: "",
    vote_average: "",
  });
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setLogin(true);
        setUserId(user.uid);
      } else {
        setLogin(false);
      }
    });
  });

  useEffect(() => {
    let isSubscribed = true;
    movieDB
      .movieDetail(params.id)
      .then(result =>
        isSubscribed
          ? setDetail({
              title: result.title,
              bgimage: "https://image.tmdb.org/t/p/w500" + result.backdrop_path,
              poster_image:
                "https://image.tmdb.org/t/p/w500" + result.poster_path,
              release_date: result.release_date,
              production_countries: result.production_countries[0].name,
              genre: result.genres[0].name,
              vote_average: result.vote_average,
            })
          : null
      )
      .catch(error => console.log("error", error));
    return () => (isSubscribed = false);
  }, [params.id, movieDB]);

  const onReviewClick = () => {
    if (!login) {
      history.push("/login");
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
          src={detail.bgimage}
          alt="background"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.poster_title}>
          <div className={styles.poster_div}>
            <img
              className={styles.poster_image}
              src={detail.poster_image}
              alt="poster"
            />
          </div>
          <h1 className={styles.title}>{detail.title}</h1>
          <p className={styles.movie_detail}>{`${
            detail.release_date.split("-")[0]
          } ・ ${detail.production_countries} ・ ${detail.genre}`}</p>
          <p className={styles.rating}>{`평점 ${detail.vote_average / 2}`}</p>
          {/* <StarRating login={login} /> */}
          <button onClick={onReviewClick}>리뷰쓰기</button>
        </div>
      </div>
      {modalState && (
        <ReviewPage
          modalOff={modalOff}
          onAdd={addReview}
          reviewRepository={reviewRepository}
          login={login}
          userId={userId}
        />
      )}
    </div>
  );
};

export default MovieDetail;

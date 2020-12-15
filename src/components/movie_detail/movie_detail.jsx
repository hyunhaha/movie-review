import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReviewPage from "../review_page/review_page";
import Actor from "../actor/actor";
import styles from "./movie_detail.module.css";
import BackImage from "../back_image/back_image";
import Poster from "../poster/poster";
import MovieBasicInfo from "../movie_basic_info/movie_basic_info";

const MovieDetail = ({ movieDB, reviewRepository, FileInput }) => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const [detail, setDetail] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState(null);
  const [actors, setActors] = useState([]);
  const [contentType, setContentType] = useState("");
  useEffect(() => {
    setContentType(location.pathname.split("/")[1]);
    if (location.pathname.split("/")[1] === "movie") {
      movieDB.movieDetail(params.id).then(result => {
        setDetail(result);
      });
      movieDB.credits(params.id).then(result => {
        setActors(result.cast);
      });
    } else {
      movieDB.tvDetail(params.id).then(result => {
        setDetail(result);
      });
      movieDB.tvCredits(params.id).then(result => {
        setActors(result.cast);
      });
    }
    setUserId(localStorage.getItem("userId"));
  }, [movieDB, params.id, location.pathname]);
  const onReviewClick = state => {
    if (!userId) {
      history.push("/login");
      setModalState(state);
    } else {
      setModalState(true);
    }
  };
  const modalOff = () => {
    setModalState(false);
  };

  return (
    <div className={styles.detail}>
      <BackImage imagePath={detail.backdrop_path && detail.backdrop_path} />
      <Poster detail={detail} onReviewClick={onReviewClick} />
      <div className={styles.representativeWrap}>
        <div className={styles.representative}>
          <div className={styles.description}>
            <MovieBasicInfo detail={detail} />
            <div className={styles.actors}>
              <h2>출연진</h2>
              <ul className={styles.actorsList}>
                {actors.map(actor => (
                  <Actor key={actor.id} actor={actor} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {modalState && (
        <ReviewPage
          modalOff={modalOff}
          reviewRepository={reviewRepository}
          movieId={params.id}
          userId={userId}
          FileInput={FileInput}
          contentType={contentType}
        />
      )}
    </div>
  );
};

export default MovieDetail;

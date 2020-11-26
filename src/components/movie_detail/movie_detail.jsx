import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewPage from "../review_page/review_page";
import Actor from "../actor/actor";
import styles from "./movie_detail.module.css";

const MovieDetail = ({ movieDB, reviewRepository }) => {
  const params = useParams();
  const history = useHistory();
  const [detail, setDetail] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState(null);
  const [actors, setActors] = useState([]);
  const posterURL = "https://image.tmdb.org/t/p/w500" + detail.poster_path;
  // const backimgURL = "https://image.tmdb.org/t/p/w1280" + detail.backdrop_path;
  const [readmore, setReadmore] = useState(true);
  const date_arr = detail.release_date && detail.release_date.split("-");
  console.log(date_arr);
  useEffect(() => {
    movieDB.movieDetail(params.id).then(result => {
      setDetail(result);
    });
    movieDB.credits(params.id).then(result => {
      console.log(result);
      setActors(result.cast);
    });
    setUserId(localStorage.getItem("userId"));
  }, [movieDB, params.id]);
  console.log(detail);
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
  const onReadmoreClick = () => {
    if (!readmore) {
      setReadmore(true);
    } else {
      setReadmore(false);
    }
  };

  return (
    <div className={styles.detail}>
      <div className={styles.background_div}>
        <div className={styles.backgroundimage}>
          <div
            className={styles.bg}
            style={
              detail.backdrop_path && {
                background: `url('https://image.tmdb.org/t/p/w1280${detail.backdrop_path}') no-repeat`,
                backgroundPosition: "center, center",
                backgroundSize: "100%",
              }
            }
          ></div>
        </div>
        {/* <img
          className={styles.backgroundimage}
          src={detail.poster_path ? backimgURL : null}
          alt="background"
        /> */}
        <div className={styles.backgroundDimmed}></div>
      </div>
      <div className={styles.posterPartWrap}>
        <div className={styles.poster_title}>
          <div className={styles.poster_div}>
            <img
              className={styles.poster_image}
              src={detail.poster_path ? posterURL : null}
              alt="poster"
            />
          </div>
          <h1 className={styles.title}>{detail.title}</h1>
          <p className={styles.movie_detail}>{`${
            detail.release_date && detail.release_date.split("-")[0]
          } ・ ${
            detail.production_countries && detail.production_countries[0].name
          } ・ ${detail.genres && detail.genres[0].name}`}</p>

          <p className={styles.rating}>{`평점 ${detail.vote_average / 2}`}</p>
          <button className={styles.reviewButton} onClick={onReviewClick}>
            리뷰쓰기
          </button>
        </div>
      </div>
      <div className={styles.representativeWrap}>
        <div className={styles.representative}>
          <div className={styles.description}>
            <div className={styles.basicInfo}>
              <h2 className={styles.movieInfoTitle}>영화정보</h2>
              <p>{detail.title}</p>
              <p>{`${
                detail.release_date && detail.release_date.split("-")[0]
              } ・ ${
                detail.production_countries &&
                detail.production_countries[0].name
              } ・ ${detail.genres && detail.genres[0].name}`}</p>
              <p>
                {`${Math.round(detail.runtime / 60)}시간 
              ${detail.runtime % 60}분`}
              </p>
              <p
                className={
                  readmore ? styles.overviewOpen : styles.overviewClose
                }
              >
                {detail.overview}
              </p>
              <div
                className={styles.overviewReadmore}
                onClick={onReadmoreClick}
              >
                {readmore ? "더보기" : "닫기"}
              </div>
            </div>
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
        />
      )}
    </div>
  );
};

export default MovieDetail;

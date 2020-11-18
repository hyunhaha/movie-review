import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../star_rating/star_rating";
import styles from "./movie_detail.module.css";

const MovieDetail = ({ movieDB }) => {
  const params = useParams();
  const [detail, setDetail] = useState({
    title: "title",
    bgimage: null,
    poster_image: null,
    release_date: "",
    production_countries: "",
    genre: "",
    vote_average: "",
  });
  useEffect(() => {
    movieDB
      .movieDetail(params.id)
      .then(result =>
        setDetail({
          title: result.title,
          bgimage: "https://image.tmdb.org/t/p/w500" + result.backdrop_path,
          poster_image: "https://image.tmdb.org/t/p/w500" + result.poster_path,
          release_date: result.release_date,
          production_countries: result.production_countries[0].name,
          genre: result.genres[0].name,
          vote_average: result.vote_average,
        })
      )
      .catch(error => console.log("error", error));
  }, [params.id, movieDB]);

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
          <StarRating />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

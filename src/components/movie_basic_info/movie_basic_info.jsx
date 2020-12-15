import React from "react";
import { useState } from "react";
import styles from "./movie_basic_info.module.css";

const MovieBasicInfo = ({ detail }) => {
  const [readmore, setReadmore] = useState(true);
  const onReadmoreClick = () => {
    if (!readmore) {
      setReadmore(true);
    } else {
      setReadmore(false);
    }
  };
  return (
    <div className={styles.basicInfo}>
      <h2 className={styles.movieInfoTitle}>영화정보</h2>
      <p>{detail.title}</p>
      <p>{`${
        (detail.release_date ? detail.release_date.split("-")[0] : "") ||
        (detail.first_air_date ? detail.first_air_date.split("-")[0] : "")
      } ・ ${
        detail.production_countries &&
        (detail.production_countries[0]
          ? detail.production_countries[0].name
          : "")
      } ・ ${detail.genres && detail.genres[0].name}`}</p>
      <p>
        {(detail.runtime
          ? `${Math.round(detail.runtime / 60)}시간 
  ${detail.runtime % 60}분`
          : "") ||
          (detail.episode_run_time ? `${detail.episode_run_time}분` : "")}
      </p>
      <p className={readmore ? styles.overviewOpen : styles.overviewClose}>
        {detail.overview}
      </p>
      <div className={styles.overviewReadmore} onClick={onReadmoreClick}>
        {readmore ? "더보기" : "닫기"}
      </div>
    </div>
  );
};

export default MovieBasicInfo;

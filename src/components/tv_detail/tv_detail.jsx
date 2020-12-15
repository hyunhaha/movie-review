import React from "react";
import styles from "./tv_detail.module.css";
const TvDetail = props => {
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
        />
      )}
    </div>
  );
};

export default TvDetail;

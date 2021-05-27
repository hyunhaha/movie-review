import React from "react";
import styles from "./image_card.module.css";
const ImageCard = ({ poster, uploadImg }) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrap}>
        <div className={styles.front}>
          <img className={styles.frontImg} src={poster} alt="poster" />
        </div>
        {uploadImg && (
          <div className={styles.back}>
            <div className={styles.backWrap}>
              <img className={styles.backImg} src={uploadImg} alt="review" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;

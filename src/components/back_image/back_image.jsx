import React from "react";
import styles from "./back_image.module.css";
const BackImage = ({ imagePath }) => {
  return (
    <div className={styles.background_div}>
      <div
        className={styles.backgroundimage}
        style={
          imagePath && {
            background: `url('https://image.tmdb.org/t/p/w1280${imagePath}') center center / 100% no-repeat, center center `,
          }
        }
      ></div>
      <div className={styles.backgroundDimmed}></div>
    </div>
  );
};

export default BackImage;

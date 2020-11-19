import React from "react";
import styles from "./review_page.module.css";
const ReviewPage = ({ modalOff }) => {
  const onCloseClick = () => {
    modalOff();
  };
  return (
    <div className={styles.modal}>
      <div className={styles.review_container}>
        <h1 className={styles.header}>리뷰페이지</h1>
        <button onClick={onCloseClick}>x</button>
      </div>
    </div>
  );
};

export default ReviewPage;

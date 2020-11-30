import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import StarRating from "../star_rating/star_rating";
import styles from "./review_page.module.css";
import cogoToast from "cogo-toast";

const ReviewPage = ({
  modalOff,
  reviewRepository,
  movieId,
  userId,
  FileInput,
}) => {
  const formRef = useRef();
  const reviewRef = useRef();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState();
  const [imageFile, setImageFile] = useState({ fileName: null, fileURL: null });

  useEffect(() => {
    if (!userId) return;

    const stopSync = reviewRepository.syncReview(userId, reviews => {
      setReview(reviews[movieId]);
    });

    return () => stopSync();
  }, [reviewRepository, userId, movieId]);

  useEffect(() => {
    setRate(review && review.rate);
  }, [review]);

  const onCloseClick = () => {
    modalOff();
  };

  const addOrUpdateCard = review => {
    reviewRepository.saveReview(userId, review);
  };

  const setReviewData = () => {
    const review = {
      id: movieId,
      movie_id: movieId,
      edit_date: Date.now() || "",
      review_content: reviewRef.current.value || "",
      rate: rate,
      fileName: imageFile.fileName || "",
      fileURL: imageFile.fileURL || "",
    };
    console.log(review);
    addOrUpdateCard(review);

    reviewRef.current.value = review.review_content;
  };

  const onChange = event => {
    if (event.currentTarget === null) {
      return;
    }
    event.preventDefault();
    setReviewData();
  };

  const onSaveClick = event => {
    event.preventDefault();
    setImageFile({ fileName: null, fileURL: null });
    setReviewData();

    const { hide } = cogoToast.success("평점과 리뷰가 저장되었습니다.", {
      onClick: () => {
        hide();
      },
      position: "top-center",
    });
  };

  const onSetRate = value => {
    setRate(value);
  };

  const onFileChanged = file => {
    setImageFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };
  return (
    <div className={styles.modal}>
      <div className={styles.review_container}>
        <button className={styles.closeButton} onClick={onCloseClick}>
          x
        </button>
        <h1 className={styles.header}>리뷰페이지</h1>
        <div className={styles.star}>
          <StarRating
            userId={userId}
            setRate={onSetRate}
            value={review && review.rate}
            onChange={onChange}
          />
        </div>
        <form className={styles.form} ref={formRef}>
          <textarea
            className={styles.reviewContent}
            ref={reviewRef}
            name="review_content"
            value={review && review.review_content}
            onChange={onChange}
            placeholder="리뷰를 작성해주세요"
          ></textarea>
          <FileInput onFileChanged={onFileChanged} name={imageFile.fileName} />
          <button className={styles.saveButton} onClick={onSaveClick}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;

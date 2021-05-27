import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import StarRating from "../star_rating/star_rating";
import styles from "./review_page.module.css";
import cogoToast from "cogo-toast";
import Loading from "../loading/loading";

const ReviewPage = ({
  modalOff,
  reviewRepository,
  movieId,
  userId,
  FileInput,
  contentType,
}) => {
  const formRef = useRef();
  const reviewRef = useRef();
  const [rate, setRate] = useState(null);
  const [review, setReview] = useState();
  const [imageFile, setImageFile] = useState({ fileName: null, fileURL: null });
  const [loading, setLoading] = useState(true);
  const [imageName, setImageName] = useState("");
  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = reviewRepository.syncReview(userId, reviews => {
      setReview(reviews[movieId]);
      setLoading(false);
    });
    return () => stopSync();
  }, [reviewRepository, userId, movieId]);

  useEffect(() => {
    setRate(review && review.rate);

    // setImageFile({
    //   fileName: (review && review.fileName) || "",
    //   fileURL: (review && review.fileURL) || "",
    // });
    setImageName(imageFile.fileName);
  }, [review, imageFile.fileName]);

  const setReviewData = () => {
    const reviewSet = {
      id: movieId,
      contentType: contentType,
      movie_id: movieId,
      edit_date: Date.now() || "",
      review_content: reviewRef.current.value || "",
      rate: rate || null,
      fileName: imageFile.fileName || "",
      fileURL: imageFile.fileURL || "",
    };
    addOrUpdateCard(reviewSet);
  };
  const onFileChanged = file => {
    console.log(file);
    setImageFile({
      fileName: file.name,
      fileURL: file.url,
    });
    console.log(imageFile);
    setImageName(file.name);
  };

  const onSaveClick = event => {
    event.preventDefault();
    setReviewData();
    console.log(imageFile);

    const { hide } = cogoToast.success("평점과 리뷰가 저장되었습니다.", {
      onClick: () => {
        hide();
      },
      position: "top-center",
    });
  };

  const addOrUpdateCard = review => {
    setReview();
    reviewRepository.saveReview(userId, review);
  };

  const onChange = event => {
    if (event.currentTarget === null) {
      return;
    }
    event.preventDefault();
    setReviewData();
  };

  const onCloseClick = () => {
    modalOff();
  };

  const onSetRate = value => {
    setRate(value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onCloseClick}></div>
      <section className={styles.review_container}>
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
          <FileInput
            onFileChanged={onFileChanged}
            name={imageName ? imageName : review && review.fileName}
          />
          <p className={styles.description}>
            업로드한 이미지는 my page에서 볼 수 있습니다
          </p>
          <button className={styles.saveButton} onClick={onSaveClick}>
            저장하기
          </button>
        </form>
        {loading && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewPage;

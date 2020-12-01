import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Loading from "../loading/loading";
import styles from "./image_upload_button.module.css";
const ImageUploadButton = ({ imageUploader, onFileChanged, name }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const onButtonClick = event => {
    event.preventDefault();
    inputRef.current.click();
  };
  const onChange = async event => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);
    onFileChanged({
      name: uploaded.original_filename,
      url: uploaded.secure_url,
    });
  };
  return (
    <div className={styles.upload}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button className={styles.button} onClick={onButtonClick}>
          {name ? name : "이미지 업로드"}
        </button>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default ImageUploadButton;

import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "./search_bar.module.css";
const SearchBar = ({ onSearch }) => {
  const inputRef = useRef();
  const history = useHistory();
  const onKeyPress = event => {
    const value = inputRef.current.value;
    if (event.key === "Enter") {
      event.preventDefault();
      value && onSearch(value);
      history.push("/search-result");
      inputRef.current.value = "";
    }
  };

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <input
          className={styles.input}
          ref={inputRef}
          type="text"
          placeholder="search..."
          onKeyPress={onKeyPress}
        />
      </label>
    </form>
  );
};

export default SearchBar;

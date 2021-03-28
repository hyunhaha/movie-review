import React from "react";
import SearchResultList from "../search_result_list/search_result_list";
import styles from "./search_result.module.css";
const SearchResult = ({ searchWord }) => {
  return (
    <div className={styles.movie}>
      {searchWord ? (
        <SearchResultList searchWord={searchWord} />
      ) : (
        <h3>검색어를 입력하세요.</h3>
      )}
    </div>
  );
};

export default SearchResult;

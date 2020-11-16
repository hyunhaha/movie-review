import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MovieList from "../movie_list/movie_list";
import styles from "./search_result.module.css";
const SearchResult = ({ movies }) => {
  return (
    <div className={styles.movie_chart}>
      <MovieList movies={movies} />
    </div>
  );
};

export default SearchResult;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MovieList from "../movie_list/movie_list";

const SearchResult = props => {
  const [searchMovie, setSearchMovie] = useState([]);
  const query = useHistory().location.state.query;

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${historyQuery}&language=ko-KR&api_key=70cdbfae5467ca38809a62f0d5f139ff`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => setSearchMovie(result.results))

      .catch(error => console.log("error", error));
  }, []);
  return <MovieList movies={searchMovie} />;
};

export default SearchResult;

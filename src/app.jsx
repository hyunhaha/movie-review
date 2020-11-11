import React from "react";

import "./app.css";
import { useState } from "react";
import { useEffect } from "react";
import MovieList from "./components/movie_list/movie_list";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?language=ko-KR&sort_by=popularity.desc&region=KR&api_key=70cdbfae5467ca38809a62f0d5f139ff",
      requestOptions
    )
      .then(response => response.json())
      .then(result => setMovies(result.results))
      .catch(error => console.log("error", error));
  }, []);

  return <MovieList movies={movies} />;
}

export default App;

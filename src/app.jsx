import React from "react";
import styles from "./app.module.css";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "./components/search_bar/search_bar";
import MovieList from "./components/movie_list/movie_list";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState([]);
  const onSearch = query => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR&api_key=70cdbfae5467ca38809a62f0d5f139ff`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => setMovies(result.results))
      .catch(error => console.log("error", error));
  };
  useEffect(() => {
    console.log("useeffect");
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&sort_by=popularity.desc&region=KR&api_key=70cdbfae5467ca38809a62f0d5f139ff",
      requestOptions
    )
      .then(response => response.json())
      .then(result => setMovies(result.results))
      .catch(error => console.log("error", error));
  }, []);
  return (
    <BrowserRouter>
      <Link to="/">
        <SearchBar onSearch={onSearch} />
      </Link>
      <Switch>
        <Route exact path="/">
          <MovieList movies={movies} />
        </Route>
        <Route exact path="/detail/:id" component={MovieDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

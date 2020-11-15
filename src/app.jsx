import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "./components/search_bar/search_bar";
import MovieList from "./components/movie_list/movie_list";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";

function App({ movieDB }) {
  const [movies, setMovies] = useState([]);
  const onSearch = query => {
    movieDB
      .search(query) //
      .then(items => {
        setMovies(items);
      });
  };
  useEffect(() => {
    movieDB
      .mostPopular() //
      .then(items => {
        setMovies(items);
      });
  }, [movieDB]);
  return (
    <BrowserRouter>
      {/* <Link to="/"> */}
      <SearchBar onSearch={onSearch} />
      {/* </Link> */}
      <Switch>
        <Route exact path="/">
          <MovieList movies={movies} />
        </Route>
        <Route exact path="/detail/:id">
          <MovieDetail movieDB={movieDB} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

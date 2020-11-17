import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "./components/search_bar/search_bar";
import MovieList from "./components/movie_list/movie_list";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";
import MainPage from "./components/main_page/main_page";
import SearchResult from "./components/search_result/search_result";
import Login from "./components/login/login";

function App({ authService, movieDB }) {
  const [movies, setMovies] = useState([]);
  const onSearch = query => {
    movieDB
      .search(query) //
      .then(items => {
        setMovies(items);
      });
  };

  return (
    <BrowserRouter>
      {/* <Link to="/"> */}

      <SearchBar onSearch={onSearch} />
      <Link to="/login">
        <button>login</button>
      </Link>

      {/* </Link> */}
      <Switch>
        <Route exact path="/">
          <MainPage movieDB={movieDB} />
        </Route>
        <Route exact path="/login">
          <Login authService={authService} />
        </Route>
        <Route exact path="/search-result">
          <SearchResult movies={movies} />
        </Route>
        <Route exact path="/detail/:id">
          <MovieDetail movieDB={movieDB} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

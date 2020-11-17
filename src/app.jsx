import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";
import MainPage from "./components/main_page/main_page";
import SearchResult from "./components/search_result/search_result";
import Login from "./components/login/login";
import Header from "./components/header/header";

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
    <div>
      <BrowserRouter>
        <Header onSearch={onSearch} authService={authService} />
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
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";
import MainPage from "./components/main_page/main_page";
import SearchResult from "./components/search_result/search_result";
import Login from "./components/login/login";
import Header from "./components/header/header";
import styles from "./app.module.css";
function App({ authService, movieDB }) {
  const [movies, setMovies] = useState([]);
  const onSearch = query => {
    movieDB
      .search(query) //
      .then(items => {
        setMovies(items);
      });
  };
  const [login, setLogin] = useState(false);
  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  });
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header onSearch={onSearch} authService={authService} login={login} />
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
            <MovieDetail movieDB={movieDB} login={login} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

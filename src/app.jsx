import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";
import MainPage from "./components/main_page/main_page";
import SearchResult from "./components/search_result/search_result";
import Login from "./components/login/login";
import Header from "./components/header/header";
import styles from "./app.module.css";
import MyReview from "./components/my_review/my_review";
import Footer from "./components/footer/footer";
function App({ authService, movieDB, reviewRepository, FileInput }) {
  const [movies, setMovies] = useState([]);

  const onSearch = query => {
    movieDB
      .search(query) //
      .then(items => {
        setMovies(items);
      });
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header onSearch={onSearch} authService={authService} />
        <Switch>
          <Route exact path="/">
            <MainPage movieDB={movieDB} authService={authService} />
          </Route>
          <Route exact path="/login">
            <Login authService={authService} />
          </Route>
          <Route exact path="/search-result">
            <SearchResult movies={movies} />
          </Route>
          <Route exact path="/detail/:id">
            <MovieDetail
              movieDB={movieDB}
              reviewRepository={reviewRepository}
              FileInput={FileInput}
            />
          </Route>
          <Route exact path="/my-review">
            <MyReview
              reviewRepository={reviewRepository}
              movieDB={movieDB}
              authService={authService}
              FileInput={FileInput}
            />
          </Route>
        </Switch>
      </BrowserRouter>{" "}
      <Footer />
    </div>
  );
}

export default App;

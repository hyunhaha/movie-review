import React, { useEffect } from "react";
import { useState } from "react";
import { Route, withRouter, Switch, useHistory } from "react-router-dom";
import MovieDetail from "./components/movie_detail/movie_detail";
import MainPage from "./components/main_page/main_page";
import SearchResult from "./components/search_result/search_result";
import Login from "./components/login/login";
import Header from "./components/header/header";
import styles from "./app.module.css";
import MyReview from "./components/my_review/my_review";
import Footer from "./components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/action/user_action";
function App({ authService, movieDB, reviewRepository, FileInput }) {
  const [searchWord, setSearchWord] = useState(undefined);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthChange(user => {
      console.log("user", user);
      if (user) {
        history.push("/");
        dispatch(setUser(user));
      } else {
        history.push("/login");
      }
    });
  }, []);

  const onSearch = query => {
    console.log(query);
    setSearchWord(query);
  };

  return (
    <div className={styles.app}>
      <Header onSearch={onSearch} authService={authService} />
      <Switch>
        <Route exact path="/">
          <MainPage movieDB={movieDB} authService={authService} />
        </Route>
        <Route exact path="/login">
          <Login authService={authService} />
        </Route>
        <Route exact path="/search-result">
          <SearchResult searchWord={searchWord} movieDB={movieDB} />
        </Route>
        <Route exact path="/movie/detail/:id">
          <MovieDetail
            movieDB={movieDB}
            reviewRepository={reviewRepository}
            FileInput={FileInput}
          />
        </Route>
        <Route exact path="/tv/detail/:id">
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
      <Footer authService={authService} />
    </div>
  );
}

export default withRouter(App);

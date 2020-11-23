import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import MovieDB from './service/movieDB';
import AuthService from './service/auth_service';
import ReviewRepository from './service/review_repository';
const authService = new AuthService();
const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);
const reviewRepository = new ReviewRepository();

ReactDOM.render(
  <React.StrictMode>
    <App movieDB={movieDB} authService={authService} reviewRepository={reviewRepository} />
  </React.StrictMode>,
  document.getElementById('root')
);



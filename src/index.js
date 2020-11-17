import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import MovieDB from './service/movieDB';
import AuthService from './service/auth_service';

const authService = new AuthService();
const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);
ReactDOM.render(
  <React.StrictMode>
    <App movieDB={movieDB} authService={authService} />
  </React.StrictMode>,
  document.getElementById('root')
);



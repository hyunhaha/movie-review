import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import MovieDB from './service/movieDB';

const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);
ReactDOM.render(
  <React.StrictMode>
    <App movieDB={movieDB} />
  </React.StrictMode>,
  document.getElementById('root')
);



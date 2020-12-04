import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/js/all.js';
import App from './app';
import MovieDB from './service/movieDB';
import AuthService from './service/auth_service';
import ReviewRepository from './service/review_repository';
import ImageUploadButton from './components/image_upload_button/image_upload_button';
import ImageUploader from './service/image_uploader';
const authService = new AuthService();
const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);
const reviewRepository = new ReviewRepository();
const imageUploader = new ImageUploader();
const FileInput = props => (
  <ImageUploadButton {...props} imageUploader={imageUploader} />
);

ReactDOM.render(
  <React.StrictMode>
    <App movieDB={movieDB} authService={authService} reviewRepository={reviewRepository} FileInput={FileInput} />

  </React.StrictMode>,
  document.getElementById('root')
);



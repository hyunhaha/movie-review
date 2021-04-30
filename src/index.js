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

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'
const authService = new AuthService();
const movieDB = new MovieDB(process.env.REACT_APP_MOVIEDB_API_KEY);
const reviewRepository = new ReviewRepository();
const imageUploader = new ImageUploader();
const FileInput = props => (
  <ImageUploadButton {...props} imageUploader={imageUploader} />
);

//object만 받는 redux store가 promise와 function도 받을 수 있게
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
    >
      <App movieDB={movieDB} authService={authService} reviewRepository={reviewRepository} FileInput={FileInput} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



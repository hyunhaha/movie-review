import firebase from 'firebase';
import 'firebase/database';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTS_ID,
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebaseApp.database();
export default firebaseApp;
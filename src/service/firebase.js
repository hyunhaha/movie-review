import firebase from 'firebase';
const firebaseConfig = {
  apiKey: process.env.REACT_API_FIREBASE_API_KEY,
  authDomain: process.env.REACT_API_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_API_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_API_FIREBASE_PROJECTS_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

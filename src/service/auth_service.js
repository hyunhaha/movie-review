import firebase from 'firebase';
import firebaseApp from './firebase'
class AuthService {
  login(providerName) {
    const authProvicer = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvicer);
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged(user => {
      onUserChanged(user);
    })
  }
}
export default AuthService;
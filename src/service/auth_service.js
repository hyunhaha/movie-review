import firebase from 'firebase';
class AuthService {
  login(providerName) {
    const authProvicer = new firebase.auth[`${providerName}AuthProvider`]();
    return firebase.auth.signInWithPopup(authProvicer);
  }
}
export default AuthService;
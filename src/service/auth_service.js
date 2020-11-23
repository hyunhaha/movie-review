import { firebaseAuth, googleProvider } from './firebase';

class AuthService {
  login(providerName) {
    const authProvicer = this.getProvider(providerName)
    return firebaseAuth.signInWithPopup(authProvicer);
  }
  logout() {
    firebaseAuth.signOut();
  }
  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged(user => {
      onUserChanged(user);
    })
  }
  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return googleProvider
      default:
        throw new Error(`not supported provider ${providerName}`)
    }

  }

}
export default AuthService;
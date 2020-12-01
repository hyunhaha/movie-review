import { firebaseDatabase } from './firebase';
class ReviewRepository {
  syncReview(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/reviews`);
    ref.on('value', snapshot => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
  saveReview(userId, review) {
    firebaseDatabase.ref(`${userId}/reviews/${review.id}`).set(review);
  }
  removeReview(userId, review) {
    firebaseDatabase.ref(`${userId}/review/${review.id}`).remove();
  }
}
export default ReviewRepository;
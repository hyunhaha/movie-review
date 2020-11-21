import { firebaseDatabase } from './firebase';
class ReviewRepository {
  saveReview(userId, review) {

    firebaseDatabase.ref(`${userId}/reviews/${review.id}`).set(review);

  }
}
export default ReviewRepository;
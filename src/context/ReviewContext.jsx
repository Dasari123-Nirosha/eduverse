
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const ReviewContext = createContext(null);

const STORAGE_KEY = 'eduverse-course-reviews';

function getSavedReviews() {
  try {
    const savedReviews = localStorage.getItem(STORAGE_KEY);
    return savedReviews ? JSON.parse(savedReviews) : [];
  } catch (error) {
    console.error('Unable to load course reviews:', error);
    return [];
  }
}

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(getSavedReviews);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(reviews)
    );
  }, [reviews]);

  const addReview = (reviewData) => {
    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      courseId: reviewData.courseId,
      studentName: reviewData.studentName,
      studentEmail: reviewData.studentEmail,
      rating: Math.min(5, Math.max(1, Number(reviewData.rating))),
      comment: reviewData.comment.trim(),
      createdAt: new Date().toISOString(),
    };

    setReviews((previousReviews) => [
      newReview,
      ...previousReviews,
    ]);

    return newReview;
  };

  const getCourseReviews = (courseId) => {
    return reviews.filter(
      (review) =>
        String(review.courseId) === String(courseId)
    );
  };

  const getAverageRating = (courseId) => {
    const courseReviews = getCourseReviews(courseId);

    if (courseReviews.length === 0) return 0;

    const totalRating = courseReviews.reduce(
      (total, review) => total + Number(review.rating),
      0
    );

    return Number(
      (totalRating / courseReviews.length).toFixed(1)
    );
  };

  const getReviewCount = (courseId) => {
    return getCourseReviews(courseId).length;
  };

  const value = {
    reviews,
    addReview,
    getCourseReviews,
    getAverageRating,
    getReviewCount,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error(
      'useReviews must be used inside ReviewProvider'
    );
  }

  return context;
}

export default ReviewContext;

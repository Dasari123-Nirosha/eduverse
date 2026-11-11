
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import courses from '../data/courses';
import { addNotification } from '../data/notifications';

const WishlistContext = createContext();

const STORAGE_KEY = 'eduverse-wishlist';

function getSavedWishlist() {
  try {
    const savedWishlist = localStorage.getItem(STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(getSavedWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Find course name for notifications
  const getCourseTitle = (courseId) => {
    const course = courses.find(
      (item) => String(item.id) === String(courseId)
    );

    return course?.title || 'Course';
  };

  // Add course to wishlist
  const addToWishlist = (courseId) => {
    const alreadySaved = wishlist.some(
      (id) => String(id) === String(courseId)
    );

    if (alreadySaved) return;

    setWishlist((previous) => [...previous, courseId]);

    addNotification({
      title: 'Added to Wishlist!',
      message: `${getCourseTitle(courseId)} has been added to your wishlist.`,
      type: 'wishlist'
    });
  };

  // Remove course from wishlist
  const removeFromWishlist = (courseId) => {
    setWishlist((previous) =>
      previous.filter(
        (id) => String(id) !== String(courseId)
      )
    );
  };

  // Toggle wishlist status
  const toggleWishlist = (courseId) => {
    const alreadySaved = wishlist.some(
      (id) => String(id) === String(courseId)
    );

    if (alreadySaved) {
      setWishlist((previous) =>
        previous.filter(
          (id) => String(id) !== String(courseId)
        )
      );

      addNotification({
        title: 'Wishlist Updated!',
        message: `${getCourseTitle(courseId)} has been removed from your wishlist.`,
        type: 'wishlist'
      });
    } else {
      setWishlist((previous) => [...previous, courseId]);

      addNotification({
        title: 'Added to Wishlist!',
        message: `${getCourseTitle(courseId)} has been added to your wishlist.`,
        type: 'wishlist'
      });
    }
  };

  // Check wishlist status
  const isWishlisted = (courseId) => {
    return wishlist.some(
      (id) => String(id) === String(courseId)
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      'useWishlist must be used inside WishlistProvider'
    );
  }

  return context;
}

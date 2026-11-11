
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Heart,
  BookOpen,
  Clock,
  Trash2,
  ArrowRight
} from 'lucide-react';

import courses from '../../data/courses';
import { useWishlist } from '../../context/WishlistContext';
import { addNotification } from '../../data/notifications';

import Toast from '../../components/common/Toast';

function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlist,
    removeFromWishlist
  } = useWishlist();

  const [toast, setToast] = useState(null);

  // Automatically close toast
  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [toast]);

  const savedCourses = courses.filter((course) =>
    wishlist.some(
      (id) => String(id) === String(course.id)
    )
  );

  // Remove course and create notification
  const handleRemove = (course) => {
    removeFromWishlist(course.id);

    const message = `${course.title} has been removed from your wishlist.`;

    addNotification({
      title: 'Wishlist Updated!',
      message,
      type: 'wishlist'
    });

    setToast({
      message: `${course.title} removed from wishlist.`,
      type: 'success'
    });
  };

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <div className="wishlist-header-icon">
          <Heart size={28} />
        </div>

        <div>
          <h1>My Wishlist</h1>
          <p>Keep your favourite courses in one place.</p>
        </div>
      </div>

      <div className="wishlist-summary">
        <Heart size={20} />
        <span>
          {savedCourses.length} Saved Courses
        </span>
      </div>

      {savedCourses.length === 0 ? (
        <div className="wishlist-empty">

          <div className="wishlist-empty-icon">
            <Heart size={42} />
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Explore courses and save your favourites
            to find them here.
          </p>

          <button
            className="wishlist-explore-button"
            onClick={() => navigate('/courses')}
          >
            <BookOpen size={18} />
            Explore Courses
          </button>

        </div>
      ) : (
        <div className="wishlist-grid">

          {savedCourses.map((course) => (
            <div
              className="wishlist-card"
              key={course.id}
            >

              <img
                src={course.image}
                alt={course.title}
                className="wishlist-course-image"
              />

              <div className="wishlist-card-content">

                <span className="wishlist-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <p className="wishlist-instructor">
                  {course.instructor}
                </p>

                <div className="wishlist-course-meta">
                  <span>
                    <Clock size={15} />
                    {course.duration}
                  </span>
                </div>

                <div className="wishlist-card-actions">

                  <button
                    className="wishlist-open-button"
                    onClick={() =>
                      navigate(`/courses/${course.id}`)
                    }
                  >
                    View Course
                    <ArrowRight size={16} />
                  </button>

                  <button
                    className="wishlist-remove-button"
                    onClick={() => handleRemove(course)}
                    aria-label={`Remove ${course.title} from wishlist`}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

      <Toast
        message={toast?.message}
        type={toast?.type || 'success'}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default Wishlist;

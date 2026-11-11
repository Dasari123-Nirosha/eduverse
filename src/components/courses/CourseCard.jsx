
import { useNavigate } from 'react-router-dom';
import { Heart, Clock3, UserRound, BookOpen } from 'lucide-react';

function CourseCard({
  course,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const navigate = useNavigate();

  if (!course) {
    return null;
  }

  const courseId = course.id ?? course._id;
  const title = course.title || course.name || 'Untitled Course';

  const image =
    course.image ||
    course.thumbnail ||
    course.imageUrl ||
    '/images/courses/web-development.jpg';

  const category = course.category || 'General';

  const instructor =
    course.instructorName ||
    (typeof course.instructor === 'string'
      ? course.instructor
      : course.instructor?.name) ||
    'EduVerse Instructor';

  const duration = course.duration || 'Self-paced';
  const level = course.level || course.courseLevel || 'Beginner';
  const price = course.price ?? course.cost ?? 'Free';

  const handleViewDetails = () => {
    if (courseId === undefined || courseId === null) {
      return;
    }

    navigate(`/courses/${courseId}`);
  };

  const handleWishlist = () => {
    onToggleWishlist?.(course);
  };

  return (
    <article className="course-card">
      <div className="course-card-image-wrapper">
        <img
          className="course-card-image"
          src={image}
          alt={title}
        />

        {onToggleWishlist && (
          <button
            type="button"
            className={`course-wishlist-button ${
              isWishlisted ? 'active' : ''
            }`}
            onClick={handleWishlist}
            aria-label={
              isWishlisted
                ? 'Remove from wishlist'
                : 'Add to wishlist'
            }
            aria-pressed={isWishlisted}
          >
            <Heart
              size={20}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>
        )}
      </div>

      <div className="course-card-content">
        <span className="course-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>
          {course.description ||
            'Explore this course and develop your skills.'}
        </p>

        <div className="course-instructor">
          <UserRound size={14} />
          <span>{instructor}</span>
        </div>

        <div className="course-card-details">
          <span>
            <Clock3 size={13} /> {duration}
          </span>

          <span>{level}</span>
        </div>

        <div className="course-card-footer">
          <strong>
            {typeof price === 'number' ? `₹${price}` : price}
          </strong>

          <button
            type="button"
            onClick={handleViewDetails}
            disabled={courseId === undefined || courseId === null}
          >
            <BookOpen size={15} />
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;

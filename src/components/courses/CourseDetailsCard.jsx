
function CourseDetailsCard({ course, onEnroll }) {
  if (!course) {
    return null;
  }

  const title = course.title || course.name || 'Untitled Course';
  const description =
    course.description || course.shortDescription || 'No description available.';
  const instructor =
    course.instructor || course.instructorName || 'EduVerse Instructor';
  const category = course.category || 'General';
  const duration = course.duration || 'Not specified';
  const price = course.price ?? course.cost ?? 'Free';
  const image =
    course.image ||
    course.thumbnail ||
    course.imageUrl ||
    '/images/courses/web-development.jpg';

  return (
    <article className="course-details-card">
      <div className="course-details-card-image">
        <img src={image} alt={title} />

        <span className="course-details-category">
          {category}
        </span>
      </div>

      <div className="course-details-card-content">
        <h2>{title}</h2>

        <p className="course-details-description">
          {description}
        </p>

        <div className="course-details-information">
          <div>
            <span>Instructor</span>
            <strong>{instructor}</strong>
          </div>

          <div>
            <span>Duration</span>
            <strong>{duration}</strong>
          </div>

          <div>
            <span>Price</span>
            <strong>
              {typeof price === 'number' ? `₹${price}` : price}
            </strong>
          </div>
        </div>

        {onEnroll && (
          <button
            type="button"
            className="course-details-enroll-button"
            onClick={() => onEnroll(course)}
          >
            Enroll Now
          </button>
        )}
      </div>
    </article>
  );
}

export default CourseDetailsCard;

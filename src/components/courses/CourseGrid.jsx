
import CourseCard from './CourseCard';

function CourseGrid({
  courses = [],
  isWishlisted,
  onToggleWishlist,
}) {
  if (!courses.length) {
    return (
      <div className="catalogue-empty">
        <h3>No Courses Found</h3>
        <p>
          No courses match your selection. Try another category
          or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="course-grid">
      {courses.map((course, index) => (
        <CourseCard
          key={course.id ?? course._id ?? index}
          course={course}
          isWishlisted={
            typeof isWishlisted === 'function'
              ? isWishlisted(course.id ?? course._id)
              : false
          }
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}

export default CourseGrid;

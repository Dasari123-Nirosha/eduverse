
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  Pencil,
  BookOpen,
  User,
  Clock,
  IndianRupee,
  Tag,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';

function CoursePreview() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { getCourseById } = useCourses();

  const [course, setCourse] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const selectedCourse = getCourseById(courseId);

    if (selectedCourse) {
      setCourse(selectedCourse);
      setNotFound(false);
      setImageError(false);
    } else {
      setCourse(null);
      setNotFound(true);
    }
  }, [courseId, getCourseById]);

  if (notFound) {
    return (
      <div className="admin-empty-state">
        <h2>Course not found</h2>

        <p>
          The course you are looking for does not exist.
        </p>

        <button
          className="admin-primary-button"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="admin-loading">
        Loading course...
      </div>
    );
  }

  const instructor =
    typeof course.instructor === 'object'
      ? course.instructor?.name || 'Not assigned'
      : course.instructor || 'Not assigned';

  const price =
    course.price !== undefined &&
    course.price !== null &&
    course.price !== ''
      ? Number(course.price)
      : null;

  return (
    <div className="admin-course-preview">

      {/* 1. PAGE HEADER */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">
            COURSE MANAGEMENT
          </p>

          <h1>Course Preview</h1>

          <p>
            Review the complete course information.
          </p>
        </div>

        <button
          className="admin-secondary-button"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>
      </div>

      {/* 2. COURSE PREVIEW CARD */}
      <div className="admin-preview-card">

        <div className="admin-preview-image">
          {course.image && !imageError ? (
            <img
              src={course.image}
              alt={course.title}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="admin-preview-image-placeholder">
              <BookOpen size={55} />
            </div>
          )}
        </div>

        <div className="admin-preview-content">

          <div className="admin-preview-top">

            <span className="admin-preview-category">
              <Tag size={15} />
              {course.category || 'General'}
            </span>

            <span className="admin-course-status">
              {course.status || 'Available'}
            </span>

          </div>

          <h2>{course.title}</h2>

          <p className="admin-preview-description">
            {course.description ||
              'No course description available.'}
          </p>

          {/* 3. COURSE DETAILS */}
          <div className="admin-preview-details">

            <div>
              <User size={19} />

              <span>
                <small>Instructor</small>
                <strong>{instructor}</strong>
              </span>
            </div>

            <div>
              <Clock size={19} />

              <span>
                <small>Duration</small>
                <strong>
                  {course.duration || 'Not specified'}
                </strong>
              </span>
            </div>

            <div>
              <IndianRupee size={19} />

              <span>
                <small>Course Price</small>

                <strong>
                  {price === null
                    ? 'Not specified'
                    : price === 0
                      ? 'Free'
                      : `₹${price.toLocaleString('en-IN')}`}
                </strong>
              </span>
            </div>

            <div>
              <BookOpen size={19} />

              <span>
                <small>Course ID</small>
                <strong>{course.id}</strong>
              </span>
            </div>

          </div>

          {/* 4. ACTIONS */}
          <div className="admin-preview-actions">

            <button
              className="admin-primary-button"
              onClick={() =>
                navigate(`/admin/courses/edit/${course.id}`)
              }
            >
              <Pencil size={18} />
              Edit Course
            </button>

            <button
              className="admin-secondary-button"
              onClick={() => navigate('/admin/courses')}
            >
              Back to Manage Courses
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CoursePreview;

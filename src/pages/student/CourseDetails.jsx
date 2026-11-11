
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Heart,
  PlayCircle,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useWishlist } from '../../context/WishlistContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useProfile } from '../../context/ProfileContext';

import Toast from '../../components/common/Toast';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getCourseById } = useCourses();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const {
    addEnrollment,
    getEnrollmentsByStudent,
  } = useEnrollment();

  const { profile } = useProfile();

  const [toast, setToast] = useState(null);

  const course = getCourseById(id);

  const studentEmail = (
    profile?.email || 'student@eduverse.com'
  ).trim().toLowerCase();

  const studentEnrollments =
    getEnrollmentsByStudent(studentEmail);

  const isEnrolled = course
    ? studentEnrollments.some(
        (enrollment) =>
          String(enrollment.courseId) === String(course.id)
      )
    : false;

  const saved = course ? isWishlisted(course.id) : false;

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleWishlistToggle = () => {
    if (!course) return;

    const alreadySaved = isWishlisted(course.id);

    toggleWishlist(course.id);

    setToast({
      message: alreadySaved
        ? `${course.title} removed from wishlist.`
        : `${course.title} added to wishlist!`,
      type: 'success',
    });
  };

  const handleStartLearning = () => {
    if (!course) return;

    if (isEnrolled) {
      navigate(`/lessons/${course.id}`);
      return;
    }

    const newEnrollment = addEnrollment({
      courseId: course.id,
      courseTitle: course.title,
      studentEmail,
      studentName: profile?.name || 'Student',
    });

    if (!newEnrollment) {
      setToast({
        message: 'You are already enrolled in this course.',
        type: 'info',
      });

      return;
    }

    setToast({
      message: `Successfully enrolled in ${course.title}!`,
      type: 'success',
    });

    setTimeout(() => {
      navigate(`/lessons/${course.id}`);
    }, 1000);
  };

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="course-details-not-found">
          <BookOpen size={48} />

          <h2>Course Not Found</h2>

          <p>
            The course you are looking for is unavailable.
          </p>

          <button onClick={() => navigate('/courses')}>
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details-page">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <button
        className="course-details-back"
        onClick={() => navigate('/courses')}
      >
        <ArrowLeft size={18} />
        Back to Courses
      </button>

      <div className="course-details-hero">

        <div className="course-details-content">

          <span className="course-details-category">
            {course.category}
          </span>

          <h1>{course.title}</h1>

          <p className="course-details-description">
            {course.description}
          </p>

          <div className="course-details-instructor">
            <GraduationCap size={19} />

            <span>
              Instructor:{' '}
              {typeof course.instructor === 'object'
                ? course.instructor?.name || 'Instructor'
                : course.instructor || 'Instructor'}
            </span>
          </div>

          <div className="course-details-meta">

            <span>
              <Clock size={17} />
              {course.duration || 'Duration not specified'}
            </span>

            <span>
              <Users size={17} />
              {Number(course.students || 0).toLocaleString('en-IN')}{' '}
              Students
            </span>

            <span>
              <BookOpen size={17} />
              {course.level || 'Beginner'}
            </span>

          </div>

          <div className="course-details-rating">
            <span>⭐ {course.rating || 0}</span>
            <span>Course Rating</span>
          </div>

          <div className="course-details-actions">

            <button
              type="button"
              className="course-details-enroll"
              onClick={handleStartLearning}
            >
              {isEnrolled ? (
                <>
                  <PlayCircle size={19} />
                  Continue Learning
                </>
              ) : (
                <>
                  <PlayCircle size={19} />
                  Start Learning
                </>
              )}
            </button>

            <button
              type="button"
              className={`course-details-wishlist ${
                saved ? 'active' : ''
              }`}
              onClick={handleWishlistToggle}
              aria-label={
                saved
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              title={
                saved
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'
              }
            >
              <Heart
                size={22}
                fill={saved ? 'currentColor' : 'none'}
              />

              <span>
                {saved ? 'Wishlisted' : 'Add to Wishlist'}
              </span>
            </button>

          </div>

        </div>

        <div className="course-details-image-wrapper">

          <img
            src={course.image || '/images/course-placeholder.png'}
            alt={course.title}
            className="course-details-image"
          />

          <div className="course-details-price">
            <span>Course Price</span>

            <strong>
              ₹{Number(course.price || 0).toLocaleString('en-IN')}
            </strong>
          </div>

        </div>

      </div>

      <div className="course-details-overview">

        <div className="course-overview-heading">
          <span>COURSE OVERVIEW</span>

          <h2>What You Will Learn</h2>

          <p>
            Explore the course and build practical knowledge
            through structured learning.
          </p>
        </div>

        <div className="course-overview-features">

          <div className="course-overview-card">
            <CheckCircle size={22} />

            <h3>Structured Learning</h3>

            <p>
              Follow an organized learning path from fundamentals
              to advanced concepts.
            </p>
          </div>

          <div className="course-overview-card">
            <PlayCircle size={22} />

            <h3>Video Lessons</h3>

            <p>
              Learn concepts through guided lessons and practical
              explanations.
            </p>
          </div>

          <div className="course-overview-card">
            <GraduationCap size={22} />

            <h3>Skill Development</h3>

            <p>
              Improve your knowledge and develop skills for
              your professional growth.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CourseDetails;

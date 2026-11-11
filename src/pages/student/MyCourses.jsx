
import { Link } from 'react-router-dom';

import {
  BookOpen,
  Clock,
  GraduationCap,
  PlayCircle,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useProfile } from '../../context/ProfileContext';

import '../../styles/MyCourses.css';

function MyCourses() {
  const { courses = [] } = useCourses();

  const {
    getEnrollmentsByStudent,
  } = useEnrollment();

  const { profile } = useProfile();

  const studentEmail = (
    profile?.email || 'student@eduverse.com'
  ).trim().toLowerCase();

  const myEnrollments =
    getEnrollmentsByStudent(studentEmail);

  const enrolledCourses = myEnrollments
    .map((enrollment) => {
      const course = courses.find(
        (item) =>
          String(item.id) === String(enrollment.courseId)
      );

      return course ? { ...course, enrollment } : null;
    })
    .filter(Boolean);

  const formatDate = (date) => {
    if (!date) return 'Date unavailable';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Date unavailable';
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="my-courses-page">

      <div className="my-courses-header">
        <div>
          <span className="my-courses-eyebrow">
            MY LEARNING
          </span>

          <h1>My Courses</h1>

          <p>
            Continue learning from the courses you have enrolled in.
          </p>
        </div>

        <div className="my-courses-total">
          <GraduationCap size={22} />

          <div>
            <strong>{enrolledCourses.length}</strong>
            <span>Enrolled Courses</span>
          </div>
        </div>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="my-courses-empty">

          <div className="my-courses-empty-icon">
            <BookOpen size={38} />
          </div>

          <h2>No enrolled courses yet</h2>

          <p>
            Explore the course catalogue and enroll in a course
            to see it here.
          </p>

          <Link
            to="/courses"
            className="my-courses-browse-button"
          >
            Browse Courses
          </Link>

        </div>
      ) : (
        <div className="my-courses-grid">

          {enrolledCourses.map((course) => {
            const progress = Math.min(
              100,
              Math.max(
                0,
                Number(course.enrollment.progress) || 0
              )
            );

            const courseTitle =
              course.title ||
              course.name ||
              'Untitled Course';

            const courseImage =
              course.image ||
              course.thumbnail ||
              course.imageUrl;

            const instructor =
              typeof course.instructor === 'object'
                ? course.instructor?.name || 'EduVerse Instructor'
                : course.instructor || 'EduVerse Instructor';

            return (
              <article
                className="my-course-card"
                key={
                  course.enrollment.id ||
                  `${course.id}-${course.enrollment.enrolledAt}`
                }
              >

                {courseImage ? (
                  <img
                    src={courseImage}
                    alt={courseTitle}
                    className="my-course-image"
                  />
                ) : (
                  <div className="my-course-image-placeholder">
                    <BookOpen size={42} />
                  </div>
                )}

                <div className="my-course-content">

                  <span className="my-course-category">
                    {course.category || 'General'}
                  </span>

                  <h2>{courseTitle}</h2>

                  <p className="my-course-instructor">
                    {instructor}
                  </p>

                  <div className="my-course-progress-heading">
                    <span>Course Progress</span>
                    <strong>{progress}%</strong>
                  </div>

                  <div
                    className="my-course-progress-track"
                    role="progressbar"
                    aria-label={`${courseTitle} progress`}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="my-course-progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="my-course-meta">
                    <span>
                      <Clock size={15} />
                      Enrolled{' '}
                      {formatDate(course.enrollment.enrolledAt)}
                    </span>
                  </div>

                  <Link
                    to={`/lessons/${encodeURIComponent(course.id)}`}
                    className="my-course-continue-button"
                  >
                    <PlayCircle size={17} />
                    {progress >= 100 ? 'Review Lessons' : 'Continue Learning'}
                  </Link>

                </div>

              </article>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MyCourses;

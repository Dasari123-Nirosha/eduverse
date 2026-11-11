
import { useState, useEffect, useMemo } from 'react';
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import {
  BookOpen,
  PlayCircle,
  Clock,
  ArrowLeft,
  GraduationCap,
  CheckCircle,
  UserPlus,
} from 'lucide-react';

import initialLessons from '../../data/lessons';

import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useProfile } from '../../context/ProfileContext';

import { addNotification } from '../../data/notifications';

import Pagination from '../../components/common/Pagination';
import Toast from '../../components/common/Toast';

const ITEMS_PER_PAGE = 5;

function Lessons() {
  const navigate = useNavigate();

  const { courseId } = useParams();
  const [searchParams] = useSearchParams();

  const { courses = [] } = useCourses();
  const { enrollments = [], addEnrollment } = useEnrollment();
  const { profile } = useProfile();

  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [enrollmentError, setEnrollmentError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  const selectedCourseId =
    courseId || searchParams.get('courseId');

  const studentEmail = (
    profile?.email || 'student@eduverse.com'
  ).trim().toLowerCase();

  // 1. Get courses available to students
  const publishedCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        !course.status ||
        String(course.status).toLowerCase() === 'published'
    );
  }, [courses]);

  // 2. Find the selected course
  const selectedCourse = useMemo(() => {
    if (!selectedCourseId) return null;

    return publishedCourses.find(
      (course) =>
        String(course.id) === String(selectedCourseId)
    ) || null;
  }, [publishedCourses, selectedCourseId]);

  // 3. Get lessons belonging to the selected course
  const courseLessons = useMemo(() => {
    if (!selectedCourse) return [];

    return initialLessons.filter(
      (lesson) =>
        String(lesson.courseId) === String(selectedCourse.id)
    );
  }, [selectedCourse]);

  // 4. Check student enrollment
  const isCourseEnrolled = (id) => {
    return enrollments.some(
      (enrollment) =>
        String(enrollment.courseId) === String(id) &&
        String(enrollment.studentEmail || '').toLowerCase() ===
          studentEmail
    );
  };

  // 5. Reset page and messages when course changes
  useEffect(() => {
    setCurrentPage(1);
    setEnrollmentMessage('');
    setEnrollmentError(false);
  }, [selectedCourseId]);

  // 6. Automatically close toast
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  // 7. Enroll student
  const handleEnroll = (course) => {
    if (!course) return;

    if (isCourseEnrolled(course.id)) {
      setEnrollmentError(true);
      setEnrollmentMessage(
        'You are already enrolled in this course.'
      );
      return;
    }

    try {
      const result = addEnrollment({
        courseId: course.id,
        courseTitle: course.title,
        studentEmail,
        studentName: profile?.name || 'Student',
      });

      if (!result?.success) {
        setEnrollmentError(true);
        setEnrollmentMessage(
          result?.message || 'Unable to enroll. Please try again.'
        );
        return;
      }

      setEnrollmentError(false);
      setEnrollmentMessage(
        `Successfully enrolled in ${course.title}!`
      );

      const message =
        `You have successfully enrolled in ${course.title}. Start learning now!`;

      addNotification({
        title: 'Enrollment Successful!',
        message,
        type: 'enrollment',
      });

      setToast({
        message: `Successfully enrolled in ${course.title}!`,
        type: 'success',
      });
    } catch (error) {
      console.error('Enrollment error:', error);
      setEnrollmentError(true);
      setEnrollmentMessage(
        'Unable to enroll. Please try again.'
      );
    }
  };

  // 8. Open lesson
  const openLesson = (course, lesson) => {
    if (!isCourseEnrolled(course.id)) {
      setEnrollmentError(true);
      setEnrollmentMessage(
        'Please enroll in this course before starting lessons.'
      );
      return;
    }

    navigate(
      `/lesson-viewer/${encodeURIComponent(course.id)}/${encodeURIComponent(lesson.id)}`
    );
  };

  // 9. Open course lessons
  const openCourse = (course) => {
    navigate(
      `/lessons?courseId=${encodeURIComponent(course.id)}`
    );
  };

  // 10. Back to courses
  const backToCourses = () => {
    navigate('/lessons');
  };

  // 11. Pagination
  const totalCoursePages = Math.max(
    1,
    Math.ceil(publishedCourses.length / ITEMS_PER_PAGE)
  );

  const totalLessonPages = Math.max(
    1,
    Math.ceil(courseLessons.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentCourses = publishedCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const currentLessons = courseLessons.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const activeTotalPages = selectedCourse
    ? totalLessonPages
    : totalCoursePages;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= activeTotalPages) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const instructorName = (course) =>
    typeof course.instructor === 'object'
      ? course.instructor?.name || 'Instructor'
      : course.instructor || 'Instructor';

  return (
    <div className="lessons-page">

      {/* 1. PAGE HEADER */}
      <div className="lessons-page-header">
        <div className="lessons-header-icon">
          <GraduationCap size={28} />
        </div>

        <div>
          <h1>Lessons</h1>
          <p>Explore your courses and continue learning.</p>
        </div>
      </div>

      {!selectedCourseId ? (
        <>
          {/* 2. COURSE HEADING */}
          <div className="lessons-course-heading">
            <h2>Explore Course Lessons</h2>
            <p>Select a course to view its lessons.</p>
          </div>

          {/* 3. COURSE CARDS */}
          <div className="lessons-course-grid">
            {currentCourses.map((course) => {
              const courseLessonCount = initialLessons.filter(
                (lesson) =>
                  String(lesson.courseId) === String(course.id)
              ).length;

              const enrolled = isCourseEnrolled(course.id);

              return (
                <div
                  className="lessons-course-card"
                  key={course.id}
                >
                  <img
                    className="lessons-course-image"
                    src={course.image || '/images/course-placeholder.png'}
                    alt={course.title}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />

                  <div className="lessons-course-info">

                    <span className="lessons-course-category">
                      {course.category || 'General'}
                    </span>

                    <h3>{course.title}</h3>

                    <p>{instructorName(course)}</p>

                    <div className="lessons-course-meta">
                      <span>
                        <BookOpen size={15} />
                        {courseLessonCount} Lessons
                      </span>

                      <span>
                        <Clock size={15} />
                        {course.duration || 'Self-paced'}
                      </span>
                    </div>

                    {/* 4. COURSE ACTIONS */}
                    <div className="lessons-course-actions">

                      <button
                        type="button"
                        className="lessons-view-button"
                        onClick={() => openCourse(course)}
                      >
                        <PlayCircle size={17} />
                        View Lessons
                      </button>

                      <button
                        type="button"
                        className="lessons-enroll-button"
                        onClick={() => handleEnroll(course)}
                        disabled={enrolled}
                      >
                        {enrolled ? (
                          <>
                            <CheckCircle size={16} />
                            Enrolled
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            Enroll Now
                          </>
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {publishedCourses.length === 0 && (
            <div className="lessons-empty-state">
              <BookOpen size={35} />
              <h3>No Courses Available</h3>
              <p>Published courses will appear here.</p>
            </div>
          )}

          {/* 5. COURSE PAGINATION */}
          {publishedCourses.length > ITEMS_PER_PAGE && (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={totalCoursePages}
                onPageChange={handlePageChange}
              />

              <p className="catalogue-page-info">
                Showing {startIndex + 1}–
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  publishedCourses.length
                )}
                {' '}of {publishedCourses.length} courses
              </p>
            </>
          )}

          {/* 6. ENROLLMENT MESSAGE */}
          {enrollmentMessage && (
            <p
              className={
                enrollmentError
                  ? 'lessons-enrollment-error'
                  : 'lessons-enrollment-success'
              }
              role="status"
            >
              {enrollmentMessage}
            </p>
          )}
        </>
      ) : selectedCourse ? (
        <>
          {/* 7. BACK BUTTON */}
          <button
            className="lessons-back-button"
            onClick={backToCourses}
          >
            <ArrowLeft size={17} />
            Back to Courses
          </button>

          {/* 8. SELECTED COURSE */}
          <div className="lessons-selected-course">
            <h2>{selectedCourse.title}</h2>

            <p>{selectedCourse.description}</p>

            <div className="lessons-enrollment-actions">
              <button
                type="button"
                className="lessons-enroll-button"
                onClick={() => handleEnroll(selectedCourse)}
                disabled={isCourseEnrolled(selectedCourse.id)}
              >
                {isCourseEnrolled(selectedCourse.id) ? (
                  <>
                    <CheckCircle size={17} />
                    Already Enrolled
                  </>
                ) : (
                  <>
                    <UserPlus size={17} />
                    Enroll Now
                  </>
                )}
              </button>
            </div>

            {enrollmentMessage && (
              <p
                className={
                  enrollmentError
                    ? 'lessons-enrollment-error'
                    : 'lessons-enrollment-success'
                }
                role="status"
              >
                {enrollmentMessage}
              </p>
            )}
          </div>

          {/* 9. COURSE LESSONS */}
          <div className="lessons-list">
            {currentLessons.map((lesson, index) => (
              <div
                className="lessons-list-item"
                key={lesson.id}
              >
                <div className="lessons-list-number">
                  {startIndex + index + 1}
                </div>

                <div className="lessons-list-info">
                  <h3>{lesson.title}</h3>

                  <p>
                    <Clock size={14} />
                    {' '}{lesson.duration || 'Not specified'}
                  </p>
                </div>

                <button
                  className="lessons-start-button"
                  onClick={() =>
                    openLesson(selectedCourse, lesson)
                  }
                  disabled={!isCourseEnrolled(selectedCourse.id)}
                >
                  <PlayCircle size={17} />
                  Start Lesson
                </button>
              </div>
            ))}

            {courseLessons.length === 0 && (
              <div className="lessons-empty-state">
                <BookOpen size={35} />
                <h3>No Lessons Available</h3>
                <p>
                  Lessons have not been added for this course yet.
                </p>
              </div>
            )}
          </div>

          {/* 10. LESSON PAGINATION */}
          {courseLessons.length > ITEMS_PER_PAGE && (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={totalLessonPages}
                onPageChange={handlePageChange}
              />

              <p className="catalogue-page-info">
                Showing {startIndex + 1}–
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  courseLessons.length
                )}
                {' '}of {courseLessons.length} lessons
              </p>
            </>
          )}
        </>
      ) : (
        <div className="lessons-empty-state">
          <BookOpen size={35} />
          <h3>Course Not Found</h3>
          <p>This course is unavailable or has been removed.</p>

          <button
            className="lessons-back-button"
            onClick={backToCourses}
          >
            <ArrowLeft size={17} />
            Back to Courses
          </button>
        </div>
      )}

      {/* 11. SUCCESS POPUP */}
      <Toast
        message={toast?.message}
        type={toast?.type || 'success'}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default Lessons;

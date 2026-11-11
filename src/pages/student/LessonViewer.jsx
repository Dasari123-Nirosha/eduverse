
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, BookOpen } from 'lucide-react';

import lessonsData from '../../data/lessons';

import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useLearning } from '../../context/LearningContext';
import { useProfile } from '../../context/ProfileContext';

import LessonSidebar from '../../components/lessons/LessonSidebar';
import LessonContent from '../../components/lessons/LessonContent';
import LessonNavigation from '../../components/lessons/LessonNavigation';

import { addNotification } from '../../data/notifications';
import { generateCertificate } from '../../utils/certificateGenerator';

import Toast from '../../components/common/Toast';

function normalizeIdentifier(value) {
  return String(value || '').trim().toLowerCase();
}

function getSavedCompletedLessons(storageKey) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function LessonViewer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const { courses = [] } = useCourses();

  const {
    enrollments = [],
    updateEnrollment,
  } = useEnrollment();

  const {
    startLearningSession,
    stopLearningSession,
  } = useLearning();

  const { profile } = useProfile();

  const studentEmail = normalizeIdentifier(profile?.email);
  const studentName = profile?.name?.trim() || 'Student';

  // 1. Get selected course.
  const course = courses.find(
    (item) => String(item.id) === String(courseId)
  );

  // 2. Get lessons for this course.
  const lessons = lessonsData.filter(
    (lesson) =>
      String(lesson.courseId) === String(courseId)
  );

  // 3. Find current lesson index.
  const initialIndex = Math.max(
    0,
    lessons.findIndex(
      (lesson) => String(lesson.id) === String(lessonId)
    )
  );

  // 4. Find the correct student's enrollment.
  const enrollment = enrollments.find(
    (item) =>
      String(item.courseId) === String(courseId) &&
      normalizeIdentifier(item.studentEmail) === studentEmail
  );

  const isEnrolled = Boolean(enrollment);

  // 5. Student-specific lesson storage.
  const storageKey =
    `eduverse-completed-lessons-${encodeURIComponent(studentEmail || 'no-email')}-${courseId}`;

  const [activeLesson, setActiveLesson] = useState(initialIndex);

  const [completedState, setCompletedState] = useState(() => ({
    key: storageKey,
    lessons: getSavedCompletedLessons(storageKey),
  }));

  const [toast, setToast] = useState(null);

  const certificateIssuingRef = useRef(false);

  // Combine existing local progress with enrollment progress.
  const enrollmentCompletedIds =
    enrollment?.completedLessonIds || [];

  const completedLessons =
    completedState.key === storageKey
      ? [
          ...new Set([
            ...completedState.lessons.map(String),
            ...enrollmentCompletedIds.map(String),
          ]),
        ]
      : enrollmentCompletedIds.map(String);

  const currentLesson = lessons[activeLesson];

  // 6. Load saved progress when course or enrollment changes.
  useEffect(() => {
    const localLessons = getSavedCompletedLessons(storageKey);

    const enrollmentLessons =
      enrollment?.completedLessonIds || [];

    const combinedLessons = [
      ...new Set([
        ...localLessons.map(String),
        ...enrollmentLessons.map(String),
      ]),
    ];

    setCompletedState({
      key: storageKey,
      lessons: combinedLessons,
    });

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(combinedLessons)
      );
    } catch (error) {
      console.error('Unable to restore lesson progress:', error);
    }

    certificateIssuingRef.current = false;
  }, [storageKey, enrollment?.id]);

  // 7. Update lesson selection when URL changes.
  useEffect(() => {
    const index = lessons.findIndex(
      (lesson) => String(lesson.id) === String(lessonId)
    );

    setActiveLesson(index >= 0 ? index : 0);
  }, [courseId, lessonId]);

  // 8. Keep lesson progress saved.
  useEffect(() => {
    if (completedState.key !== storageKey) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(completedState.lessons)
      );
    } catch (error) {
      console.error('Unable to save lesson progress:', error);
    }
  }, [completedState, storageKey]);

  // 9. Automatically close toast.
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  // 10. Track learning time only for enrolled students.
  useEffect(() => {
    const validLesson = lessons.some(
      (lesson) => String(lesson.id) === String(lessonId)
    );

    if (
      !course ||
      !isEnrolled ||
      !studentEmail ||
      !validLesson
    ) {
      return;
    }

    startLearningSession(courseId, lessonId);

    return () => {
      stopLearningSession();
    };
  }, [
    courseId,
    lessonId,
    course,
    isEnrolled,
    studentEmail,
    startLearningSession,
    stopLearningSession,
  ]);

  // 11. Calculate completed lessons and progress.
  const validCompletedLessons = completedLessons.filter(
    (id) =>
      lessons.some(
        (lesson) => String(lesson.id) === String(id)
      )
  );

  const uniqueCompletedLessons = [
    ...new Set(validCompletedLessons.map(String)),
  ];

  const progress = lessons.length > 0
    ? Math.round(
        (uniqueCompletedLessons.length / lessons.length) * 100
      )
    : 0;

  const isCompleted = currentLesson
    ? completedLessons.some(
        (id) => String(id) === String(currentLesson.id)
      )
    : false;

  const isCourseCompleted =
    lessons.length > 0 &&
    uniqueCompletedLessons.length === lessons.length;

  // 12. Save course completion and issue its certificate.
  const completeCourseAndIssueCertificate = (
    completedIds
  ) => {
    if (!enrollment || !isEnrolled) return;

    const alreadyIssued =
      enrollment.certificateIssued === true ||
      enrollment.certificate?.certificateIssued === true ||
      enrollment.certificate?.status === 'Issued';

    const completionDate = new Date();

    let certificateUpdate = {};

    if (!alreadyIssued) {
      if (certificateIssuingRef.current) return;

      certificateIssuingRef.current = true;

      try {
        const courseTitle =
          course.title || course.name || 'EduVerse Course';

        const generatedCertificate = generateCertificate({
          studentName,
          courseTitle,
          completionDate,
        });

        const certificate = {
          ...generatedCertificate,
          recipientName: studentName,
          studentName,
          courseTitle,
          certificateIssued: true,
          issuedBy: 'EduVerse',
          status: 'Issued',
        };

        certificateUpdate = {
          certificateIssued: true,
          certificate,
          completedAt: completionDate.toISOString(),
        };
      } catch (error) {
        certificateIssuingRef.current = false;

        console.error(
          'Certificate generation failed:',
          error
        );

        setToast({
          message: 'Unable to generate certificate. Please try again.',
          type: 'error',
        });

        return;
      }
    }

    // Update only this course's enrollment.
    updateEnrollment(enrollment.id, {
      progress: 100,
      completedLessonIds: completedIds,
      status: 'Completed',
      ...certificateUpdate,
    });

    if (!alreadyIssued) {
      try {
        addNotification({
          title: 'Certificate Earned!',
          message:
            `Congratulations ${studentName}! You completed ${course.title || course.name} and earned your certificate.`,
          type: 'certificate',
        });
      } catch (error) {
        console.error('Unable to create notification:', error);
      }

      setToast({
        message:
          `Congratulations ${studentName}! Your certificate has been generated!`,
        type: 'success',
      });
    } else {
      setToast({
        message: 'Course completion saved successfully!',
        type: 'success',
      });
    }
  };

  // 13. Recover a completed course if its certificate is missing.
  useEffect(() => {
    if (
      !course ||
      !enrollment ||
      !isEnrolled ||
      !isCourseCompleted
    ) {
      return;
    }

    const alreadyIssued =
      enrollment.certificateIssued === true ||
      enrollment.certificate?.certificateIssued === true ||
      enrollment.certificate?.status === 'Issued';

    const completionAlreadySaved =
      Number(enrollment.progress) >= 100 &&
      enrollment.status === 'Completed';

    if (alreadyIssued && completionAlreadySaved) return;

    completeCourseAndIssueCertificate(
      uniqueCompletedLessons
    );
  }, [
    isCourseCompleted,
    enrollment,
    course,
    isEnrolled,
    studentName,
  ]);

  // 14. Mark the current lesson completed.
  const markComplete = () => {
    if (
      !currentLesson ||
      isCompleted ||
      !studentEmail ||
      !isEnrolled ||
      !enrollment
    ) {
      return;
    }

    const nextCompletedIds = [
      ...new Set([
        ...completedLessons.map(String),
        String(currentLesson.id),
      ]),
    ];

    // Save lesson completion immediately.
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(nextCompletedIds)
      );
    } catch (error) {
      console.error('Unable to save completed lesson:', error);
    }

    setCompletedState({
      key: storageKey,
      lessons: nextCompletedIds,
    });

    const nextProgress = Math.round(
      (nextCompletedIds.filter((id) =>
        lessons.some(
          (lesson) => String(lesson.id) === String(id)
        )
      ).length / lessons.length) * 100
    );

    const courseIsNowCompleted =
      nextProgress >= 100 &&
      lessons.length > 0;

    // Save progress to the enrollment immediately.
    if (courseIsNowCompleted) {
      completeCourseAndIssueCertificate(nextCompletedIds);
    } else {
      updateEnrollment(enrollment.id, {
        progress: nextProgress,
        completedLessonIds: nextCompletedIds,
        status: 'Active',
      });
    }

    try {
      addNotification({
        title: 'Lesson Completed!',
        message:
          `${currentLesson.title} in ${course.title || course.name} has been completed. Keep learning!`,
        type: 'achievement',
      });
    } catch (error) {
      console.error('Unable to create lesson notification:', error);
    }

    if (!courseIsNowCompleted) {
      setToast({
        message:
          `${currentLesson.title} completed successfully!`,
        type: 'success',
      });
    }
  };

  // 15. Navigate to next lesson.
  const goToNext = () => {
    if (activeLesson < lessons.length - 1) {
      const nextLesson = lessons[activeLesson + 1];

      navigate(
        `/lesson-viewer/${encodeURIComponent(courseId)}/${encodeURIComponent(nextLesson.id)}`
      );
    }
  };

  // 16. Navigate to previous lesson.
  const goToPrevious = () => {
    if (activeLesson > 0) {
      const previousLesson = lessons[activeLesson - 1];

      navigate(
        `/lesson-viewer/${encodeURIComponent(courseId)}/${encodeURIComponent(previousLesson.id)}`
      );
    }
  };

  // 17. Select lesson from sidebar.
  const selectLesson = (index) => {
    const selectedLesson = lessons[index];

    if (selectedLesson) {
      navigate(
        `/lesson-viewer/${encodeURIComponent(courseId)}/${encodeURIComponent(selectedLesson.id)}`
      );
    }
  };

  // 18. Invalid course.
  if (!course) {
    return (
      <div className="lesson-empty-state">
        <GraduationCap size={45} />
        <h3>Course Not Found</h3>
        <p>The requested course could not be found.</p>

        <button
          type="button"
          onClick={() => navigate('/courses')}
        >
          <ArrowLeft size={16} />
          Back to Courses
        </button>
      </div>
    );
  }

  // 19. Student profile check.
  if (!studentEmail) {
    return (
      <div className="lesson-empty-state">
        <GraduationCap size={45} />
        <h3>Student Profile Required</h3>
        <p>
          Please add an email address to your student profile
          before learning.
        </p>

        <button
          type="button"
          onClick={() => navigate('/profile')}
        >
          Update Profile
        </button>
      </div>
    );
  }

  // 20. Enrollment check.
  if (!isEnrolled) {
    return (
      <div className="lesson-empty-state">
        <BookOpen size={45} />
        <h3>Enrollment Required</h3>
        <p>
          Please enroll in {course.title || course.name}
          {' '}before accessing its lessons.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/lessons?courseId=${encodeURIComponent(courseId)}`
            )
          }
        >
          <GraduationCap size={17} />
          View Course and Enroll
        </button>
      </div>
    );
  }

  // 21. No lesson data.
  if (lessons.length === 0 || !currentLesson) {
    return (
      <div className="lesson-empty-state">
        <GraduationCap size={45} />
        <h3>No Lessons Available</h3>
        <p>Lessons for this course will appear here.</p>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/lessons?courseId=${encodeURIComponent(courseId)}`
            )
          }
        >
          <ArrowLeft size={16} />
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-viewer-page">
      <LessonSidebar
        course={course}
        lessons={lessons}
        activeLesson={activeLesson}
        completedLessons={completedLessons}
        progress={progress}
        onSelectLesson={selectLesson}
      />

      <main className="lesson-main-content">
        <LessonContent
          course={course}
          lesson={currentLesson}
          activeLesson={activeLesson}
          totalLessons={lessons.length}
        />

        <LessonNavigation
          activeLesson={activeLesson}
          totalLessons={lessons.length}
          isCompleted={isCompleted}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onMarkComplete={markComplete}
        />
      </main>

      <Toast
        message={toast?.message}
        type={toast?.type || 'success'}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default LessonViewer;

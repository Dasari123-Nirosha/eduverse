
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  ClipboardCheck,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

import courses from '../../data/courses';
import quizzes from '../../data/quizzes';
import { addNotification } from '../../data/notifications';

import QuizProgress from '../../components/quiz/QuizProgress';
import QuizQuestion from '../../components/quiz/QuizQuestion';
import QuizOptions from '../../components/quiz/QuizOptions';
import QuizResult from '../../components/quiz/QuizResult';
import Pagination from '../../components/common/Pagination';
import Toast from '../../components/common/Toast';

const COURSES_PER_PAGE = 5;
const QUIZ_DURATION = 15 * 60;

function Quiz() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const submittedRef = useRef(false);

  const selectedCourse = courses.find(
    (course) => String(course.id) === String(courseId)
  );

  const questions = courseId
    ? quizzes[courseId] || []
    : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_DURATION);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  const totalPages = Math.ceil(
    courses.length / COURSES_PER_PAGE
  );

  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;

  const currentCourses = courses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setSecondsLeft(QUIZ_DURATION);
    setIsSubmitted(false);
    setToast(null);
    submittedRef.current = false;
  }, [courseId]);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [toast]);

  const score = questions.reduce((total, question, index) => {
    return total + (
      answers[index] === question.correctAnswer ? 1 : 0
    );
  }, 0);

  const handleSubmit = useCallback(() => {
    if (
      submittedRef.current ||
      isSubmitted ||
      !selectedCourse ||
      questions.length === 0
    ) {
      return;
    }

    submittedRef.current = true;

    const message = `You scored ${score} out of ${questions.length} in ${selectedCourse.title}.`;

    addNotification({
      title: 'Quiz Submitted!',
      message,
      type: 'quiz',
    });

    setToast({
      message: 'Quiz submitted successfully!',
      type: 'success',
    });

    setIsSubmitted(true);
  }, [isSubmitted, selectedCourse, questions.length, score]);

  useEffect(() => {
    if (
      !courseId ||
      isSubmitted ||
      questions.length === 0 ||
      secondsLeft === 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [courseId, isSubmitted, questions.length, secondsLeft]);

  useEffect(() => {
    if (
      courseId &&
      secondsLeft === 0 &&
      !isSubmitted &&
      questions.length > 0
    ) {
      handleSubmit();
    }
  }, [
    secondsLeft,
    isSubmitted,
    courseId,
    questions.length,
    handleSubmit,
  ]);

  const handleAnswer = (optionIndex) => {
    if (isSubmitted) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  };

  const handleRetake = () => {
    submittedRef.current = false;

    setCurrentQuestion(0);
    setAnswers({});
    setSecondsLeft(QUIZ_DURATION);
    setIsSubmitted(false);
    setToast(null);
  };

  const handleManualSubmit = () => {
    if (submittedRef.current || isSubmitted) return;

    const unansweredCount =
      questions.length - Object.keys(answers).length;

    if (unansweredCount > 0) {
      const shouldSubmit = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Do you want to submit the quiz?`
      );

      if (!shouldSubmit) return;
    }

    handleSubmit();
  };

  // Quiz Catalogue
  if (!courseId) {
    return (
      <div className="quiz-page">

        <div className="quiz-page-header">
          <div>
            <span className="quiz-eyebrow">
              TEST YOUR KNOWLEDGE
            </span>

            <h1>Quizzes</h1>

            <p>
              Choose a course and challenge yourself with
              course-specific questions.
            </p>
          </div>

          <div className="quiz-header-icon">
            <ClipboardCheck size={35} />
          </div>
        </div>

        <div className="quiz-summary-grid">

          <div className="quiz-summary-card">
            <BookOpen size={25} />

            <div>
              <h3>{courses.length}</h3>
              <p>Available Courses</p>
            </div>
          </div>

          <div className="quiz-summary-card">
            <ClipboardCheck size={25} />

            <div>
              <h3>
                {courses.reduce(
                  (total, course) =>
                    total + (quizzes[course.id]?.length || 0),
                  0
                )}
              </h3>

              <p>Total Questions</p>
            </div>
          </div>

          <div className="quiz-summary-card">
            <Clock size={25} />

            <div>
              <h3>15 Min</h3>
              <p>Quiz Duration</p>
            </div>
          </div>

        </div>

        <div className="quiz-section-heading">
          <h2>Choose Your Course</h2>
          <p>Select a course to start its quiz.</p>
        </div>

        <div className="quiz-course-grid">

          {currentCourses.map((course) => {
            const questionCount =
              quizzes[course.id]?.length || 0;

            return (
              <article
                className="quiz-course-card"
                key={course.id}
              >

                <div className="quiz-course-image">
                  <img
                    src={course.image}
                    alt={course.title}
                  />

                  <span className="quiz-level">
                    {course.level}
                  </span>
                </div>

                <div className="quiz-course-content">

                  <span className="quiz-category">
                    {course.category}
                  </span>

                  <h3>{course.title}</h3>

                  <p>
                    Test your understanding of {course.title}
                    through interactive questions.
                  </p>

                  <div className="quiz-course-info">
                    <span>
                      <ClipboardCheck size={16} />
                      {questionCount} Questions
                    </span>

                    <span>
                      <Clock size={16} />
                      15 Minutes
                    </span>
                  </div>

                  <button
                    type="button"
                    className="quiz-start-btn"
                    disabled={questionCount === 0}
                    onClick={() =>
                      navigate(`/quizzes/${course.id}`)
                    }
                  >
                    Start Quiz
                    <ArrowRight size={18} />
                  </button>

                </div>

              </article>
            );
          })}

        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {courses.length > 0 && (
          <p className="catalogue-page-info">
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + COURSES_PER_PAGE,
              courses.length
            )}
            {' '}of {courses.length} courses
          </p>
        )}

      </div>
    );
  }

  // Invalid Course or Missing Quiz
  if (!selectedCourse || questions.length === 0) {
    return (
      <div className="quiz-empty-state">
        <ClipboardCheck size={45} />

        <h2>Quiz Not Available</h2>

        <p>
          Questions for this course could not be found.
        </p>

        <button
          type="button"
          onClick={() => navigate('/quizzes')}
          className="quiz-start-btn"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  // Quiz Results
  if (isSubmitted) {
    return (
      <div className="quiz-page">

        <QuizResult
          course={selectedCourse}
          questions={questions}
          answers={answers}
          score={score}
          onRetake={handleRetake}
          onBack={() => navigate('/quizzes')}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

      </div>
    );
  }

  // Active Quiz
  const question = questions[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="quiz-page">

      <div className="quiz-attempt-header">

        <div>
          <span className="quiz-eyebrow">
            COURSE QUIZ
          </span>

          <h1>{selectedCourse.title}</h1>

          <p>Answer each question carefully.</p>
        </div>

        <div className="quiz-timer">
          <Clock size={20} />

          <div>
            <span>Time Remaining</span>

            <strong>
              {Math.floor(secondsLeft / 60)}:
              {String(secondsLeft % 60).padStart(2, '0')}
            </strong>
          </div>
        </div>

      </div>

      <QuizProgress
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
        answeredQuestions={answeredCount}
        secondsLeft={secondsLeft}
      />

      <div className="quiz-question-card">

        <div className="quiz-question-top">
          <span>QUESTION {currentQuestion + 1}</span>
          <span>{selectedCourse.category}</span>
        </div>

        <QuizQuestion
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <QuizOptions
          options={question.options}
          selectedAnswer={answers[currentQuestion]}
          onSelectAnswer={handleAnswer}
        />

        <div className="quiz-question-navigation">

          <button
            type="button"
            className="quiz-secondary-btn"
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion((previous) => previous - 1)
            }
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              type="button"
              className="quiz-start-btn"
              onClick={() =>
                setCurrentQuestion((previous) => previous + 1)
              }
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="quiz-submit-btn"
              onClick={handleManualSubmit}
            >
              Submit Quiz
              <CheckCircle size={18} />
            </button>
          )}

        </div>

      </div>

      <div className="quiz-question-palette">

        <h3>Question Navigator</h3>

        <div className="quiz-number-grid">

          {questions.map((item, index) => (
            <button
              type="button"
              key={item.id ?? `${courseId}-${index}`}
              className={`
                ${currentQuestion === index ? 'active' : ''}
                ${answers[index] !== undefined ? 'answered' : ''}
              `}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}

        </div>

        <div className="quiz-palette-legend">
          <span>Current</span>
          <span>Answered</span>
          <span>Not Answered</span>
        </div>

      </div>

      <button
        type="button"
        className="quiz-submit-bottom"
        onClick={handleManualSubmit}
      >
        Submit Quiz
      </button>

    </div>
  );
}

export default Quiz;

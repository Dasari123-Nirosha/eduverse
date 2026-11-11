
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Trophy,
  CheckCircle,
  XCircle,
  BookOpen,
  RotateCcw,
  ArrowLeft,
  Target,
} from 'lucide-react';

import { useQuiz } from '../../context/QuizContext';
import { useCourses } from '../../context/CourseContext';

function QuizResults() {
  const navigate = useNavigate();

  const { getLatestResult } = useQuiz();
  const { getCourseById } = useCourses();

  const result = getLatestResult();

  const course = result
    ? getCourseById(result.courseId)
    : null;

  const questions = Array.isArray(result?.questions)
    ? result.questions
    : [];

  const answers = result?.answers || {};

  const calculatedResults = useMemo(() => {
    const correctAnswers = questions.filter(
      (question, index) =>
        Number(answers[index]) === Number(question.correctAnswer)
    ).length;

    const totalQuestions = questions.length;

    const incorrectAnswers =
      totalQuestions - correctAnswers;

    const percentage = totalQuestions > 0
      ? Math.round(
          (correctAnswers / totalQuestions) * 100
        )
      : 0;

    return {
      correctAnswers,
      incorrectAnswers,
      totalQuestions,
      percentage,
    };
  }, [questions, answers]);

  if (!result || questions.length === 0) {
    return (
      <div className="quiz-results-page">
        <div className="quiz-results-empty">
          <BookOpen size={48} />

          <h2>No Quiz Results Found</h2>

          <p>
            Complete a quiz to view your score and answer review.
          </p>

          <button
            type="button"
            onClick={() => navigate('/quizzes')}
          >
            <ArrowLeft size={18} />
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const {
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    percentage,
  } = calculatedResults;

  const getResultMessage = () => {
    if (percentage >= 90) {
      return 'Excellent Work!';
    }

    if (percentage >= 75) {
      return 'Great Job!';
    }

    if (percentage >= 50) {
      return 'Good Effort!';
    }

    return 'Keep Practicing!';
  };

  const handleRetake = () => {
    navigate(`/quizzes/${result.courseId}`);
  };

  return (
    <div className="quiz-results-page">

      <div className="quiz-results-header">
        <button
          type="button"
          className="quiz-results-back"
          onClick={() => navigate('/quizzes')}
        >
          <ArrowLeft size={18} />
          Back to Quizzes
        </button>

        <span className="quiz-results-label">
          QUIZ COMPLETED
        </span>

        <h1>Quiz Results</h1>

        <p>
          {course?.title || result.courseTitle || 'Course Quiz'}
        </p>
      </div>

      <div className="quiz-results-summary">

        <div className="quiz-results-trophy">
          <Trophy size={42} />
        </div>

        <h2>{getResultMessage()}</h2>

        <p>
          You have successfully completed your quiz.
        </p>

        <div className="quiz-results-score">
          <strong>{percentage}%</strong>
          <span>Your Score</span>
        </div>

        <div className="quiz-results-score-details">
          <span>
            {correctAnswers} out of {totalQuestions} correct answers
          </span>
        </div>

      </div>

      <div className="quiz-results-stats">

        <div className="quiz-result-stat">
          <CheckCircle size={24} />

          <strong>{correctAnswers}</strong>

          <span>Correct Answers</span>
        </div>

        <div className="quiz-result-stat">
          <XCircle size={24} />

          <strong>{incorrectAnswers}</strong>

          <span>Incorrect Answers</span>
        </div>

        <div className="quiz-result-stat">
          <Target size={24} />

          <strong>{totalQuestions}</strong>

          <span>Total Questions</span>
        </div>

      </div>

      <div className="quiz-results-review">

        <div className="quiz-review-heading">
          <h2>Answer Review</h2>

          <p>
            Review your answers and understand the correct
            solutions.
          </p>
        </div>

        <div className="quiz-review-list">

          {questions.map((question, index) => {
            const selectedAnswer = answers[index];

            const hasAnswered =
              selectedAnswer !== undefined &&
              selectedAnswer !== null;

            const isCorrect =
              hasAnswered &&
              Number(selectedAnswer) ===
                Number(question.correctAnswer);

            const options = Array.isArray(question.options)
              ? question.options
              : [];

            return (
              <div
                className={`quiz-review-card ${
                  isCorrect ? 'correct' : 'incorrect'
                }`}
                key={question.id || index}
              >

                <div className="quiz-review-card-header">

                  <h3>
                    Question {index + 1}
                  </h3>

                  <span>
                    {isCorrect ? (
                      <>
                        <CheckCircle size={16} />
                        Correct
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        Incorrect
                      </>
                    )}
                  </span>

                </div>

                <p className="quiz-review-question">
                  {question.question}
                </p>

                <div className="quiz-review-answers">

                  {options.map((option, optionIndex) => {
                    const isSelected =
                      Number(selectedAnswer) === optionIndex;

                    const isCorrectOption =
                      Number(question.correctAnswer) === optionIndex;

                    let optionClass = '';

                    if (isCorrectOption) {
                      optionClass = 'correct-answer';
                    } else if (isSelected) {
                      optionClass = 'wrong-answer';
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`quiz-review-option ${optionClass}`}
                      >
                        <span className="quiz-review-option-letter">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>

                        <span>{option}</span>

                        {isCorrectOption && (
                          <CheckCircle size={17} />
                        )}

                        {isSelected &&
                          !isCorrectOption && (
                            <XCircle size={17} />
                          )}
                      </div>
                    );
                  })}

                </div>

                {!hasAnswered && (
                  <p className="quiz-review-not-answered">
                    You did not answer this question.
                  </p>
                )}

                {question.explanation && (
                  <div className="quiz-review-explanation">
                    <strong>Explanation:</strong>

                    <p>{question.explanation}</p>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

      <div className="quiz-results-actions">

        <button
          type="button"
          className="quiz-results-retake"
          onClick={handleRetake}
        >
          <RotateCcw size={18} />
          Retake Quiz
        </button>

        <button
          type="button"
          className="quiz-results-all"
          onClick={() => navigate('/quizzes')}
        >
          <BookOpen size={18} />
          Explore All Quizzes
        </button>

      </div>

    </div>
  );
}

export default QuizResults;

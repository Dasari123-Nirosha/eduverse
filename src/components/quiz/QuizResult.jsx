import {
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

function QuizResult({
  course,
  questions = [],
  answers = {},
  score = 0,
  onRetake,
  onBack,
}) {
  const totalQuestions = questions.length;

  const percentage =
    totalQuestions > 0
      ? Math.round((score / totalQuestions) * 100)
      : 0;

  const incorrectAnswers = totalQuestions - score;

  return (
    <section className="quiz-result">
      <div className="quiz-result-header">
        <Award size={52} />

        <h1>Quiz Completed!</h1>

        <p>{course?.title || 'Your Quiz'}</p>
      </div>

      <div className="quiz-result-score">
        <span>Your Score</span>

        <h2>
          {score} / {totalQuestions}
        </h2>

        <p>{percentage}%</p>
      </div>

      <div className="quiz-result-stats">
        <div>
          <CheckCircle size={23} />
          <strong>{score}</strong>
          <span>Correct</span>
        </div>

        <div>
          <XCircle size={23} />
          <strong>{incorrectAnswers}</strong>
          <span>Incorrect</span>
        </div>
      </div>

      <div className="quiz-result-review">
        <h3>Answer Review</h3>

        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id];
          const isCorrect =
            selectedAnswer === question.correctAnswer;

          return (
            <article
              className="quiz-review-item"
              key={question.id}
            >
              <div className="quiz-review-question">
                <span>{index + 1}.</span>
                <h4>{question.question}</h4>
              </div>

              <p>
                Your answer:{' '}
                {selectedAnswer !== undefined
                  ? question.options[selectedAnswer]
                  : 'Not answered'}
              </p>

              <p>
                Correct answer:{' '}
                {question.options[question.correctAnswer]}
              </p>

              <span className={isCorrect ? 'correct' : 'incorrect'}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>

              {question.explanation && (
                <p className="quiz-review-explanation">
                  {question.explanation}
                </p>
              )}
            </article>
          );
        })}
      </div>

      <div className="quiz-result-actions">
        <button type="button" onClick={onRetake}>
          <RotateCcw size={17} />
          Retake Quiz
        </button>

        <button type="button" onClick={onBack}>
          <BookOpen size={17} />
          All Quizzes
        </button>
      </div>
    </section>
  );
}

export default QuizResult;
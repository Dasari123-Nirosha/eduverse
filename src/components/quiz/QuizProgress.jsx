import { Clock, ClipboardCheck } from 'lucide-react';

function QuizProgress({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  secondsLeft,
}) {
  const progress =
    totalQuestions > 0
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <section className="quiz-progress">
      <div className="quiz-progress-info">
        <div className="quiz-progress-item">
          <ClipboardCheck size={19} />
          <span>
            {answeredQuestions} / {totalQuestions} Answered
          </span>
        </div>

        <div className="quiz-progress-item">
          <Clock size={19} />
          <span>
            {minutes}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        className="quiz-progress-track"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>
        Currently viewing question {currentQuestion} of {totalQuestions}
      </p>
    </section>
  );
}

export default QuizProgress;
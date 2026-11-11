function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
}) {
  if (!question) return null;

  return (
    <section className="quiz-question">
      <div className="quiz-question-number">
        Question {questionNumber} of {totalQuestions}
      </div>

      <h2 className="quiz-question-title">
        {question.question}
      </h2>
    </section>
  );
}

export default QuizQuestion;
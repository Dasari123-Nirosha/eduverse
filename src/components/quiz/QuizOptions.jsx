function QuizOptions({
  options = [],
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
  correctAnswer,
}) {
  return (
    <div className="quiz-options">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrect = correctAnswer === index;

        let optionClass = '';

        if (showResult && isCorrect) {
          optionClass = 'correct';
        } else if (showResult && isSelected && !isCorrect) {
          optionClass = 'incorrect';
        } else if (isSelected) {
          optionClass = 'selected';
        }

        return (
          <button
            key={index}
            type="button"
            className={`quiz-option ${optionClass}`}
            onClick={() => onSelectAnswer(index)}
            disabled={showResult}
          >
            <span className="quiz-option-letter">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="quiz-option-text">
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default QuizOptions;
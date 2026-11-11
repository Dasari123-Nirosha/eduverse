
 // Calculate the number of correct answers
export const calculateCorrectAnswers = (questions = [], answers = []) => {
  if (!Array.isArray(questions) || !Array.isArray(answers)) {
    return 0;
  }

  return questions.reduce((count, question, index) => {
    return count + (
      answers[index] === question.correctAnswer ? 1 : 0
    );
  }, 0);
};

// Calculate the number of incorrect answers
export const calculateIncorrectAnswers = (questions = [], answers = []) => {
  if (!Array.isArray(questions)) {
    return 0;
  }

  return Math.max(
    0,
    questions.length - calculateCorrectAnswers(questions, answers)
  );
};

// Calculate quiz percentage
export const calculateQuizPercentage = (correctAnswers, totalQuestions) => {
  if (!totalQuestions || totalQuestions <= 0) {
    return 0;
  }

  return Math.round(
    (correctAnswers / totalQuestions) * 100
  );
};

// Calculate complete quiz result
export const calculateQuizResult = (questions = [], answers = []) => {
  const totalQuestions = Array.isArray(questions)
    ? questions.length
    : 0;

  const correctAnswers = calculateCorrectAnswers(
    questions,
    answers
  );

  const incorrectAnswers = calculateIncorrectAnswers(
    questions,
    answers
  );

  const percentage = calculateQuizPercentage(
    correctAnswers,
    totalQuestions
  );

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentage,
    passed: percentage >= 50
  };
};

// Get quiz performance message
export const getQuizPerformance = (percentage) => {
  if (percentage >= 90) {
    return 'Excellent Performance!';
  }

  if (percentage >= 75) {
    return 'Great Job!';
  }

  if (percentage >= 50) {
    return 'Good Effort!';
  }

  return 'Keep Practicing!';
};

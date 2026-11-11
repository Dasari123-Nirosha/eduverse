
import { createContext, useContext, useEffect, useState } from 'react';

const QuizContext = createContext();

const STORAGE_KEY = 'eduverse-quiz-results';

export function QuizProvider({ children }) {
  const [quizResults, setQuizResults] = useState(() => {
    try {
      const savedResults = localStorage.getItem(STORAGE_KEY);
      return savedResults ? JSON.parse(savedResults) : [];
    } catch (error) {
      console.error('Error loading quiz results:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizResults));
  }, [quizResults]);

  const submitQuiz = ({
    quizId,
    courseId,
    answers,
    questions,
  }) => {
    const totalQuestions = questions.length;

    const correctAnswers = questions.filter((question, index) => {
      return answers[index] === question.correctAnswer;
    }).length;

    const score =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    const result = {
      id: Date.now(),
      quizId,
      courseId,
      answers,
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      score,
      completedAt: new Date().toISOString(),
    };

    setQuizResults((previousResults) => [
      ...previousResults,
      result,
    ]);

    return result;
  };

  const getQuizResults = (quizId) => {
    return quizResults.filter(
      (result) => String(result.quizId) === String(quizId)
    );
  };

  const getCourseQuizResults = (courseId) => {
    return quizResults.filter(
      (result) => String(result.courseId) === String(courseId)
    );
  };

  const getLatestResult = (quizId) => {
    const results = getQuizResults(quizId);

    return results.length
      ? results[results.length - 1]
      : null;
  };

  const getCompletedQuizCount = () => {
    return new Set(
      quizResults.map((result) => String(result.quizId))
    ).size;
  };

  const value = {
    quizResults,
    submitQuiz,
    getQuizResults,
    getCourseQuizResults,
    getLatestResult,
    getCompletedQuizCount,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error(
      'useQuiz must be used inside a QuizProvider'
    );
  }

  return context;
}

export default QuizContext;

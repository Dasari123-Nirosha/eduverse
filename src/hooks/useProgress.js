
import { useEffect, useState } from 'react';

function useProgress(courseId, lessons = []) {
  const storageKey = `eduverse-completed-lessons-${courseId}`;

  const totalLessons = Array.isArray(lessons)
    ? lessons.length
    : Number(lessons) || 0;

  const loadProgress = () => {
    try {
      const savedProgress = localStorage.getItem(storageKey);

      return savedProgress
        ? JSON.parse(savedProgress)
        : [];
    } catch (error) {
      console.error('Error loading learning progress:', error);
      return [];
    }
  };

  const [progressState, setProgressState] = useState(() => ({
    courseId,
    completedLessons: loadProgress(),
  }));

  useEffect(() => {
    setProgressState({
      courseId,
      completedLessons: loadProgress(),
    });
  }, [courseId]);

  useEffect(() => {
    if (progressState.courseId !== courseId) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(progressState.completedLessons)
      );
    } catch (error) {
      console.error('Error saving learning progress:', error);
    }
  }, [storageKey, courseId, progressState]);

  const completedLessons =
    progressState.courseId === courseId
      ? progressState.completedLessons
      : [];

  const completedCount = completedLessons.length;

  const progress = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  const markComplete = (lessonIndex) => {
    setProgressState((previous) => {
      if (previous.courseId !== courseId) return previous;

      if (previous.completedLessons.includes(lessonIndex)) {
        return previous;
      }

      return {
        ...previous,
        completedLessons: [
          ...previous.completedLessons,
          lessonIndex,
        ],
      };
    });
  };

  const isLessonCompleted = (lessonIndex) => {
    return completedLessons.includes(lessonIndex);
  };

  const resetProgress = () => {
    setProgressState({
      courseId,
      completedLessons: [],
    });
  };

  return {
    completedLessons,
    completedCount,
    totalLessons,
    progress,
    markComplete,
    isLessonCompleted,
    resetProgress,
  };
}

export default useProgress;

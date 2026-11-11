
 // Calculate course progress percentage
export const calculateProgress = (completedCount, totalCount) => {
  if (!totalCount || totalCount <= 0) {
    return 0;
  }

  const progress = (completedCount / totalCount) * 100;

  return Math.min(100, Math.max(0, Math.round(progress)));
};

// Calculate remaining lessons
export const calculateRemainingLessons = (
  completedCount,
  totalCount
) => {
  return Math.max(0, totalCount - completedCount);
};

// Calculate completed lesson count
export const calculateCompletedLessons = (completedLessons = []) => {
  return Array.isArray(completedLessons)
    ? completedLessons.length
    : 0;
};

// Get course completion status
export const getCourseStatus = (progress) => {
  if (progress >= 100) {
    return 'Completed';
  }

  if (progress > 0) {
    return 'In Progress';
  }

  return 'Not Started';
};

// Calculate total learning progress
export const calculateTotalProgress = (courses = []) => {
  if (!Array.isArray(courses) || courses.length === 0) {
    return 0;
  }

  const totalProgress = courses.reduce(
    (total, course) => total + (Number(course.progress) || 0),
    0
  );

  return Math.round(totalProgress / courses.length);
};

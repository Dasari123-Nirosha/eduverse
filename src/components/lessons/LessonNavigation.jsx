
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

function LessonNavigation({
  activeLesson,
  totalLessons,
  isCompleted,
  onPrevious,
  onNext,
  onMarkComplete
}) {
  return (
    <div className="lesson-navigation">
      <button
        type="button"
        className="lesson-navigation-button"
        onClick={onPrevious}
        disabled={activeLesson === 0}
      >
        <ChevronLeft size={17} />
        Previous
      </button>

      <button
        type="button"
        className={`lesson-complete-button ${
          isCompleted ? 'completed' : ''
        }`}
        onClick={onMarkComplete}
        disabled={isCompleted}
      >
        <CheckCircle size={17} />
        {isCompleted ? 'Completed' : 'Mark Complete'}
      </button>

      <button
        type="button"
        className="lesson-navigation-button"
        onClick={onNext}
        disabled={activeLesson === totalLessons - 1}
      >
        Next
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

export default LessonNavigation;

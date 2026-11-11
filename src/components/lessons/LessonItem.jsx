
import { CheckCircle, Circle, Clock } from 'lucide-react';

function LessonItem({
  lesson,
  index,
  isActive,
  isCompleted,
  onClick
}) {
  return (
    <button
      type="button"
      className={`lesson-item ${isActive ? 'active' : ''} ${
        isCompleted ? 'completed' : ''
      }`}
      onClick={onClick}
    >
      <span className="lesson-item-icon">
        {isCompleted ? (
          <CheckCircle size={18} />
        ) : (
          <Circle size={18} />
        )}
      </span>

      <span className="lesson-item-info">
        <h4>{lesson.title}</h4>
        <p>
          <Clock size={12} />
          {lesson.duration || '10 min'}
        </p>
      </span>
    </button>
  );
}

export default LessonItem;


import { BookOpen } from 'lucide-react';

import LessonItem from './LessonItem';

function LessonSidebar({
  course,
  lessons,
  activeLesson,
  completedLessons,
  progress,
  onSelectLesson
}) {
  return (
    <aside className="lesson-sidebar">

      {/* Course Information */}
      <div className="lesson-sidebar-header">
        <h2>{course?.title || 'Course Lessons'}</h2>
        <p>Course Curriculum</p>
      </div>

      {/* Course Progress */}
      <div className="lesson-course-progress">
        <h3>Your Progress</h3>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>
          {completedLessons.length} of {lessons.length} lessons completed
        </p>
      </div>

      {/* Course Lessons */}
      <div className="lesson-list">
        <h3>
          <BookOpen size={17} />
          Course Lessons
        </h3>

        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id || index}
              lesson={lesson}
              index={index}
              isActive={activeLesson === index}
              isCompleted={completedLessons.includes(index)}
              onClick={() => onSelectLesson(index)}
            />
          ))
        ) : (
          <p>No lessons available for this course.</p>
        )}
      </div>

    </aside>
  );
}

export default LessonSidebar;

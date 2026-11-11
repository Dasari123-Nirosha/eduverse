
import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, BookOpen } from 'lucide-react';

function CourseCurriculum({ curriculum = [] }) {
  const [expandedSections, setExpandedSections] = useState([0]);

  const toggleSection = (index) => {
    setExpandedSections((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  if (!curriculum.length) {
    return (
      <div className="course-curriculum-empty">
        <BookOpen size={28} />
        <h3>Course Curriculum</h3>
        <p>Curriculum details will be available soon.</p>
      </div>
    );
  }

  return (
    <section className="course-curriculum">
      <h2>Course Curriculum</h2>

      <div className="curriculum-sections">
        {curriculum.map((section, index) => {
          const lessons = section.lessons || section.topics || [];
          const isExpanded = expandedSections.includes(index);

          return (
            <div className="curriculum-section" key={section.id ?? index}>
              <button
                type="button"
                className="curriculum-section-header"
                onClick={() => toggleSection(index)}
                aria-expanded={isExpanded}
              >
                <span className="curriculum-section-title">
                  {section.title || section.name || `Section ${index + 1}`}
                  <small>
                    {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
                  </small>
                </span>

                {isExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {isExpanded && (
                <div className="curriculum-lesson-list">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, lessonIndex) => (
                      <div
                        className="curriculum-lesson"
                        key={lesson.id ?? lessonIndex}
                      >
                        <PlayCircle size={18} />

                        <span>
                          {typeof lesson === 'string'
                            ? lesson
                            : lesson.title || lesson.name || `Lesson ${lessonIndex + 1}`}
                        </span>

                        {typeof lesson === 'object' && lesson.duration && (
                          <small>{lesson.duration}</small>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="curriculum-no-lessons">
                      No lessons added to this section yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CourseCurriculum;

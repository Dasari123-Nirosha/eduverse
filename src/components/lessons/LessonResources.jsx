
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  ClipboardCheck
} from 'lucide-react';

function LessonResources({ lesson }) {
  if (!lesson) return null;

  const studyNotes = lesson.studyNotes || [];
  const practiceMaterials = lesson.practiceMaterials || [];
  const resources = lesson.resources || [];

  const downloadNotes = () => {
    const content = [
      `EDUVERSE - STUDY NOTES`,
      `Course: ${lesson.courseTitle}`,
      `Lesson: ${lesson.title}`,
      '',
      'STUDY NOTES',
      '',
      ...studyNotes.flatMap((note, index) => [
        `${index + 1}. ${note.heading}`,
        note.content,
        ''
      ]),
      'LEARNING OBJECTIVES',
      '',
      ...(lesson.objectives || []).map(
        (objective, index) => `${index + 1}. ${objective}`
      ),
      '',
      'PRACTICE MATERIALS',
      '',
      ...practiceMaterials.flatMap((item, index) => [
        `${index + 1}. ${item.title} (${item.type})`,
        item.question,
        ''
      ])
    ].join('\n');

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${lesson.title.replace(/[^a-z0-9]/gi, '-')}-notes.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <section className="lesson-resources">

      {/* Study Notes */}
      <div className="lesson-resource-section">

        <div className="lesson-resource-heading">
          <BookOpen size={21} />
          <h3>Study Notes</h3>
        </div>

        <div className="lesson-study-notes">

          {studyNotes.length > 0 ? (
            studyNotes.map((note, index) => (
              <article
                className="lesson-note-card"
                key={index}
              >
                <h4>
                  {index + 1}. {note.heading}
                </h4>

                <p>{note.content}</p>
              </article>
            ))
          ) : (
            <p>
              Study notes for this lesson will be available here.
            </p>
          )}

        </div>

        <button
          type="button"
          className="lesson-download-btn"
          onClick={downloadNotes}
        >
          <Download size={17} />
          Download Study Notes
        </button>

      </div>

      {/* Practice Materials */}
      <div className="lesson-resource-section">

        <div className="lesson-resource-heading">
          <ClipboardCheck size={21} />
          <h3>Practice Materials</h3>
        </div>

        <div className="lesson-practice-list">

          {practiceMaterials.length > 0 ? (
            practiceMaterials.map((item, index) => (
              <article
                className="lesson-practice-item"
                key={index}
              >
                <span>{index + 1}</span>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.question}</p>
                  <small>{item.type}</small>
                </div>
              </article>
            ))
          ) : (
            <p>
              Practice activities for this lesson will be available here.
            </p>
          )}

        </div>

      </div>

      {/* Additional Resources */}
      {resources.length > 0 && (
        <div className="lesson-resource-section">

          <div className="lesson-resource-heading">
            <FileText size={21} />
            <h3>Additional Resources</h3>
          </div>

          <div className="lesson-additional-resources">

            {resources.map((resource, index) => (
              <a
                key={resource.id || index}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={17} />
                {resource.name || resource.title || 'Open Resource'}
                <ExternalLink size={15} />
              </a>
            ))}

          </div>
        </div>
      )}

    </section>
  );
}

export default LessonResources;

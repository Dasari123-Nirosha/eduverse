
import {
  PlayCircle,
  BookOpen,
  Video,
  ExternalLink
} from 'lucide-react';

import LessonResources from './LessonResources';

function LessonContent({
  course,
  lesson,
  activeLesson,
  totalLessons
}) {
  if (!lesson) {
    return (
      <div className="lesson-empty-state">
        <BookOpen size={45} />
        <h3>No Lessons Available</h3>
        <p>Lessons for this course will appear here.</p>
      </div>
    );
  }

  const objectives = lesson.objectives || [];

  const videoUrl = lesson.videoUrl?.trim();

  const videoSearchUrl =
    lesson.videoSearchUrl ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${course.title} ${lesson.title} tutorial`
    )}`;

  const getEmbedUrl = (url) => {
    if (!url) return '';

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes('youtube.com')) {
        const videoId = parsedUrl.searchParams.get('v');

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (parsedUrl.pathname.startsWith('/embed/')) {
          return url;
        }
      }

      if (parsedUrl.hostname === 'youtu.be') {
        const videoId = parsedUrl.pathname.slice(1);

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    } catch {
      return url;
    }

    return url;
  };

  return (
    <>
      {/* Lesson Header */}
      <div className="lesson-content-header">
        <div>
          <h1>{lesson.title}</h1>
          <p>
            Lesson {activeLesson + 1} of {totalLessons}
          </p>
        </div>

        <span>
          <BookOpen size={17} />
          {course.title}
        </span>
      </div>

      {/* Lesson Video */}
      <section className="lesson-video-container">

        {videoUrl ? (
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={lesson.title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="lesson-video-placeholder">

            <div className="lesson-video-icon">
              <PlayCircle size={55} />
            </div>

            <h3>{lesson.title}</h3>

            <p>
              Watch tutorials specifically related to this topic.
            </p>

            <a
              href={videoSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="lesson-video-search-btn"
            >
              <Video size={18} />
              Watch Lesson Videos
              <ExternalLink size={15} />
            </a>

          </div>
        )}

      </section>

      {/* Lesson Description */}
      <section className="lesson-description">
        <h2>About This Lesson</h2>
        <p>{lesson.description}</p>
      </section>

      {/* Learning Objectives */}
      <section className="lesson-objectives">
        <h3>What You Will Learn</h3>

        <ul>
          {objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </section>

      {/* Study Notes and Practice Materials */}
      <LessonResources lesson={lesson} />

    </>
  );
}

export default LessonContent;

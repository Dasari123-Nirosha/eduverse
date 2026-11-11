
import { UserRound, BriefcaseBusiness } from 'lucide-react';

function InstructorCard({ instructor }) {
  if (!instructor) {
    return null;
  }

  const name =
    typeof instructor === 'string'
      ? instructor
      : instructor.name || instructor.fullName || 'EduVerse Instructor';

  const image =
    typeof instructor === 'object'
      ? instructor.image || instructor.profileImage || instructor.avatar
      : null;

  const designation =
    typeof instructor === 'object'
      ? instructor.designation || instructor.role || 'Course Instructor'
      : 'Course Instructor';

  const bio =
    typeof instructor === 'object'
      ? instructor.bio || instructor.description || 'Meet your course instructor and learn from their experience.'
      : 'Your course instructor';

  return (
    <article className="instructor-card">
      <div className="instructor-card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <UserRound size={42} />
        )}
      </div>

      <div className="instructor-card-content">
        <h3>{name}</h3>

        <p className="instructor-card-designation">
          <BriefcaseBusiness size={15} />
          {designation}
        </p>

        <p className="instructor-card-bio">{bio}</p>
      </div>
    </article>
  );
}

export default InstructorCard;

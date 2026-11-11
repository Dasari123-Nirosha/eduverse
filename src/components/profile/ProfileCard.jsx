
import { UserRound, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

function ProfileCard({ profile }) {
  const initials = profile?.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'S';

  return (
    <div className="profile-card">
      <div className="profile-card-avatar">
        <span>{initials}</span>
      </div>

      <h2>{profile?.name || 'Student'}</h2>

      <p className="profile-card-role">
        <GraduationCap size={17} />
        EduVerse Student
      </p>

      <div className="profile-card-details">
        <p>
          <Mail size={17} />
          <span>{profile?.email || 'No email added'}</span>
        </p>

        <p>
          <Phone size={17} />
          <span>{profile?.phone || 'No phone added'}</span>
        </p>

        <p>
          <MapPin size={17} />
          <span>{profile?.location || 'Location not added'}</span>
        </p>
      </div>

      {profile?.bio && (
        <div className="profile-card-bio">
          <h3>About Me</h3>
          <p>{profile.bio}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;

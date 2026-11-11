
import { useEffect, useState } from 'react';

import {
  Mail,
  GraduationCap,
  Pencil,
  Save,
  X,
  BookOpen,
} from 'lucide-react';

import courses from '../../data/courses';
import { useProfile } from '../../context/ProfileContext';

function StudentProfile() {
  const { profile, updateProfile } = useProfile();

  const [formData, setFormData] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isEditing) {
      setFormData({ ...profile });
    }
  }, [profile, isEditing]);

  useEffect(() => {
    if (!saveMessage) return;

    const timer = setTimeout(() => {
      setSaveMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [saveMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedProfile = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      bio: formData.bio.trim(),
    };

    if (!updatedProfile.name || !updatedProfile.email) {
      setSaveMessage('Name and email are required.');
      return;
    }

    try {
      updateProfile(updatedProfile);

      setFormData(updatedProfile);
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Unable to update student profile:', error);
      setSaveMessage('Unable to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
    setSaveMessage('');
  };

  return (
    <div className="student-profile-page">

      <div className="profile-page-header">
        <div>
          <span className="profile-eyebrow">
            PERSONAL INFORMATION
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and learning profile.
          </p>
        </div>
      </div>

      <section className="profile-overview-card">

        <div className="profile-avatar">
          {profile.name?.charAt(0).toUpperCase() || 'S'}
        </div>

        <div className="profile-overview-info">

          <h2>{profile.name || 'Student'}</h2>

          <p>
            <Mail size={16} />
            {profile.email}
          </p>

          <span className="profile-student-badge">
            <GraduationCap size={16} />
            Student
          </span>

        </div>

        {!isEditing && (
          <button
            type="button"
            className="profile-edit-btn"
            onClick={() => {
              setFormData({ ...profile });
              setIsEditing(true);
              setSaveMessage('');
            }}
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        )}

      </section>

      {saveMessage && (
        <div className="profile-success-message" role="status">
          {saveMessage}
        </div>
      )}

      <section className="profile-details-card">

        <div className="profile-section-heading">
          <div>
            <h2>Personal Information</h2>
            <p>Your basic personal details.</p>
          </div>
        </div>

        <form onSubmit={handleSave}>

          <div className="profile-form-grid">

            <div className="profile-field">
              <label htmlFor="profile-name">
                Full Name
              </label>

              <input
                id="profile-name"
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">
                Email Address
              </label>

              <input
                id="profile-email"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-phone">
                Phone Number
              </label>

              <input
                id="profile-phone"
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter phone number"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-location">
                Location
              </label>

              <input
                id="profile-location"
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your location"
              />
            </div>

            <div className="profile-field profile-full-width">
              <label htmlFor="profile-bio">
                About Me
              </label>

              <textarea
                id="profile-bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell us about yourself"
              />
            </div>

          </div>

          {isEditing && (
            <div className="profile-form-actions">

              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-btn"
              >
                <Save size={17} />
                Save Changes
              </button>

            </div>
          )}

        </form>
      </section>

      <section className="profile-learning-card">

        <div className="profile-learning-icon">
          <BookOpen size={25} />
        </div>

        <div>
          <h3>Continue Your Learning Journey</h3>

          <p>
            Explore our collection of {courses.length} available courses
            and discover new skills.
          </p>
        </div>

      </section>

    </div>
  );
}

export default StudentProfile;

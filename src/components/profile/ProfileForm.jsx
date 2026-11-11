
import { useState } from 'react';
import { Save, X } from 'lucide-react';

function ProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    bio: profile?.bio || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form-group">
        <label htmlFor="profile-name">Full Name</label>
        <input
          id="profile-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="profile-form-group">
        <label htmlFor="profile-email">Email Address</label>
        <input
          id="profile-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="profile-form-group">
        <label htmlFor="profile-phone">Phone Number</label>
        <input
          id="profile-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="profile-form-group">
        <label htmlFor="profile-location">Location</label>
        <input
          id="profile-location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your location"
        />
      </div>

      <div className="profile-form-group">
        <label htmlFor="profile-bio">About Me</label>
        <textarea
          id="profile-bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows="4"
        />
      </div>

      <div className="profile-form-actions">
        <button type="submit" className="profile-save-btn">
          <Save size={17} />
          Save Changes
        </button>

        <button
          type="button"
          className="profile-cancel-btn"
          onClick={onCancel}
        >
          <X size={17} />
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;

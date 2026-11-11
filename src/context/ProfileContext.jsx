
import { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext();

const STORAGE_KEY = 'eduverse-student-profile';

const defaultProfile = {
  name: 'Student',
  email: 'student@eduverse.com',
  phone: '',
  bio: '',
  location: '',
  profileImage: '',
  joinedDate: new Date().toISOString().split('T')[0],
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY);

      return savedProfile
        ? { ...defaultProfile, ...JSON.parse(savedProfile) }
        : defaultProfile;
    } catch (error) {
      console.error('Error loading profile:', error);
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updatedData) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      ...updatedData,
    }));
  };

  const updateProfileImage = (image) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      profileImage: image,
    }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
  };

  const value = {
    profile,
    updateProfile,
    updateProfileImage,
    resetProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      'useProfile must be used inside a ProfileProvider'
    );
  }

  return context;
}

export default ProfileContext;

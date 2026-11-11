
import { useEffect, useState } from 'react';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  UserRound,
  BookOpen,
  Save,
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const defaultSettings = {
  theme: 'light',
  displayName: true,
  learningReminders: true,
  courseRecommendations: true,
};

const applyTheme = (theme) => {
  const selectedTheme = theme === 'dark' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', selectedTheme);
  document.body.setAttribute('data-theme', selectedTheme);

  document.documentElement.style.colorScheme = selectedTheme;
  document.body.style.colorScheme = selectedTheme;
};

function Settings() {
  const { createNotification } = useNotifications();

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('eduverse-settings');

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    applyTheme(settings.theme);
  }, []);

  const handleThemeChange = (theme) => {
    setSettings((previous) => ({
      ...previous,
      theme,
    }));

    setSaveMessage('');
  };

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaveMessage('');
  };

  const handleSave = () => {
    try {
      localStorage.setItem(
        'eduverse-settings',
        JSON.stringify(settings)
      );

      applyTheme(settings.theme);

      createNotification({
        title: 'Settings Updated',
        message: 'Your EduVerse preferences have been saved successfully.',
        type: 'settings',
      });

      setSaveMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Unable to save settings:', error);
      setSaveMessage('Unable to save settings. Please try again.');
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-page-header">
        <div>
          <span className="settings-eyebrow">PREFERENCES</span>
          <h1>Settings</h1>
          <p>Customize your EduVerse learning experience.</p>
        </div>

        <div className="settings-header-icon">
          <SettingsIcon size={28} />
        </div>
      </div>

      {saveMessage && (
        <div className="settings-success-message">
          {saveMessage}
        </div>
      )}

      <section className="settings-section">
        <div className="settings-section-heading">
          <Sun size={21} />
          <div>
            <h2>Appearance</h2>
            <p>Choose your preferred application theme.</p>
          </div>
        </div>

        <div className="settings-theme-options">
          <button
            type="button"
            className={`settings-theme-card ${
              settings.theme === 'light' ? 'active' : ''
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun size={25} />
            <span>Light Mode</span>
            <small>Warm and comfortable appearance</small>
          </button>

          <button
            type="button"
            className={`settings-theme-card ${
              settings.theme === 'dark' ? 'active' : ''
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon size={25} />
            <span>Dark Mode</span>
            <small>Dark appearance for your workspace</small>
          </button>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-heading">
          <UserRound size={21} />
          <div>
            <h2>Account Preferences</h2>
            <p>Customize how your account information is displayed.</p>
          </div>
        </div>

        <div className="settings-options-list">
          <div className="settings-option">
            <div className="settings-option-info">
              <UserRound size={20} />
              <div>
                <h3>Display Student Name</h3>
                <p>Show your name in your learning dashboard.</p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={settings.displayName}
              onChange={() => handleToggle('displayName')}
              aria-label="Display student name"
            />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-heading">
          <BookOpen size={21} />
          <div>
            <h2>Learning Preferences</h2>
            <p>Personalize your learning experience.</p>
          </div>
        </div>

        <div className="settings-options-list">
          <div className="settings-option">
            <div className="settings-option-info">
              <BookOpen size={20} />
              <div>
                <h3>Learning Reminders</h3>
                <p>Enable reminders to continue your courses.</p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={settings.learningReminders}
              onChange={() => handleToggle('learningReminders')}
              aria-label="Learning reminders"
            />
          </div>

          <div className="settings-option">
            <div className="settings-option-info">
              <BookOpen size={20} />
              <div>
                <h3>Course Recommendations</h3>
                <p>Show recommended courses on your dashboard.</p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={settings.courseRecommendations}
              onChange={() => handleToggle('courseRecommendations')}
              aria-label="Course recommendations"
            />
          </div>
        </div>
      </section>

      <div className="settings-save-area">
        <button
          type="button"
          className="settings-save-btn"
          onClick={handleSave}
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;

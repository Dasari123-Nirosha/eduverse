
const STORAGE_KEY = 'eduverse-notifications';

const notifications = [
  {
    id: 1,
    title: 'Welcome to EduVerse!',
    message: 'Start exploring courses and begin your learning journey.',
    time: 'Just now',
    type: 'welcome',
    read: false,
  },
  {
    id: 2,
    title: 'Continue Learning',
    message: 'Continue your enrolled courses and complete your lessons.',
    time: 'Today',
    type: 'course',
    read: false,
  },
  {
    id: 3,
    title: 'Quiz Reminder',
    message: 'Check your course quizzes and test your knowledge.',
    time: 'Today',
    type: 'quiz',
    read: false,
  },
  {
    id: 4,
    title: 'Learning Achievement',
    message: 'Keep learning to earn your course completion certificates.',
    time: 'Yesterday',
    type: 'achievement',
    read: true,
  },
  {
    id: 5,
    title: 'Explore New Courses',
    message: 'Discover new courses and develop your skills.',
    time: 'Yesterday',
    type: 'course',
    read: true,
  },
];

// Get saved notifications
export const getNotifications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(notifications)
    );

    return notifications;
  } catch (error) {
    console.error('Unable to load notifications:', error);
    return [];
  }
};

// Save notifications and update the application
const saveNotifications = (updatedNotifications) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(
      new Event('eduverse-notifications-updated')
    );

    return true;
  } catch (error) {
    console.error('Unable to save notifications:', error);
    return false;
  }
};

// Add a new notification
export const addNotification = ({
  title,
  message,
  type = 'welcome',
}) => {
  const newNotification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    message,
    time: new Date().toLocaleString(),
    type,
    read: false,
  };

  const currentNotifications = getNotifications();

  const updatedNotifications = [
    newNotification,
    ...currentNotifications,
  ];

  const saved = saveNotifications(updatedNotifications);

  if (!saved) {
    throw new Error('Unable to save the new notification.');
  }

  window.dispatchEvent(
    new CustomEvent('eduverse-notification-created', {
      detail: newNotification,
    })
  );

  return newNotification;
};

// Mark one notification as read
export const markNotificationAsRead = (id) => {
  const updatedNotifications = getNotifications().map(
    (notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
  );

  saveNotifications(updatedNotifications);
};

// Delete one notification
export const deleteNotification = (id) => {
  const updatedNotifications = getNotifications().filter(
    (notification) => notification.id !== id
  );

  saveNotifications(updatedNotifications);
};

export default notifications;

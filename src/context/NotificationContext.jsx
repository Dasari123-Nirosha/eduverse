
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  getNotifications,
  addNotification,
  markNotificationAsRead,
  deleteNotification,
} from '../data/notifications';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() =>
    getNotifications()
  );

  const refreshNotifications = useCallback(() => {
    setNotifications(getNotifications());
  }, []);

  useEffect(() => {
    window.addEventListener(
      'eduverse-notifications-updated',
      refreshNotifications
    );

    window.addEventListener('storage', refreshNotifications);

    return () => {
      window.removeEventListener(
        'eduverse-notifications-updated',
        refreshNotifications
      );

      window.removeEventListener('storage', refreshNotifications);
    };
  }, [refreshNotifications]);

  const createNotification = (notificationData) => {
    const newNotification = addNotification(notificationData);

    refreshNotifications();

    return newNotification;
  };

  const markAsRead = (id) => {
    markNotificationAsRead(id);
    refreshNotifications();
  };

  const markAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });

    refreshNotifications();
  };

  const removeNotification = (id) => {
    deleteNotification(id);
    refreshNotifications();
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const value = {
    notifications,
    unreadCount,
    createNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotifications must be used inside NotificationProvider'
    );
  }

  return context;
}

export default NotificationContext;

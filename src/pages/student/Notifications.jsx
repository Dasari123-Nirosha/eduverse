
import { useEffect, useState } from 'react';


import {
  Bell,
  BookOpen,
  ClipboardCheck,
  Award,
  Check,
  CheckCheck,
  Trash2,
  Inbox,
  Settings,
} from 'lucide-react';

import { useNotifications } from '../../context/NotificationContext';

function Notifications() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  // Get the current theme
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  // Detect theme changes automatically
  useEffect(() => {
    const updateTheme = () => {
      const selectedTheme =
        document.documentElement.getAttribute('data-theme') || 'light';

      setTheme(selectedTheme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Notification icons
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'course':
        return <BookOpen size={20} />;

      case 'quiz':
        return <ClipboardCheck size={20} />;

      case 'achievement':
        return <Award size={20} />;

      case 'settings':
        return <Settings size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div
      className={`notifications-page notifications-theme-${theme}`}
      data-theme={theme}
    >
      {/* Page Header */}
      <div className="notifications-header">
        <div>
          <div className="notifications-eyebrow">
            STAY UPDATED
          </div>

          <h1>Notifications</h1>

          <p>
            Keep track of your learning updates and activities.
          </p>
        </div>

        <div className="notifications-header-icon">
          <Bell size={26} />
        </div>
      </div>

      {/* Notification Summary */}
      <div className="notifications-summary">
        <p>
          You have <strong>{unreadCount}</strong> unread notifications.
        </p>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="notifications-list">
        <div className="notifications-list-header">
          <h2>Recent Notifications</h2>
        </div>

        {notifications.length === 0 ? (
          <div className="notifications-empty">
            <Inbox size={35} />

            <h3>No notifications</h3>

            <p>
              You are all caught up. New updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              className={`notification-card ${
                notification.read ? 'read' : 'unread'
              }`}
              key={notification.id}
            >
              {/* Notification Icon */}
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Notification Details */}
              <div className="notification-content">
                <div className="notification-title-row">
                  <h3>{notification.title}</h3>

                  {!notification.read && (
                    <span className="notification-dot"></span>
                  )}
                </div>

                <p>{notification.message}</p>

                <span className="notification-time">
                  {notification.time}
                </span>
              </div>

              {/* Notification Actions */}
              <div className="notification-actions">
                {!notification.read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                    aria-label="Mark as read"
                  >
                    <Check size={17} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeNotification(notification.id)}
                  title="Delete notification"
                  aria-label="Delete notification"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;

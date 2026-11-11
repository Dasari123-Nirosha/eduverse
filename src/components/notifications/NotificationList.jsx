
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  BookOpen,
  Trophy,
  ClipboardCheck,
  Check,
  CheckCheck,
  Trash2,
  X,
  ArrowRight
} from "lucide-react";

import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification
} from "../../data/notifications";

function NotificationList({ onClose }) {
  const [notifications, setNotifications] = useState(
    () => getNotifications()
  );

  const navigate = useNavigate();

  useEffect(() => {
    const updateNotifications = () => {
      setNotifications(getNotifications());
    };

    window.addEventListener(
      "eduverse-notifications-updated",
      updateNotifications
    );

    window.addEventListener("storage", updateNotifications);

    return () => {
      window.removeEventListener(
        "eduverse-notifications-updated",
        updateNotifications
      );

      window.removeEventListener("storage", updateNotifications);
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkRead = (id) => {
    markNotificationAsRead(id);
    setNotifications(getNotifications());
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true
    }));

    localStorage.setItem(
      "eduverse-notifications",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("eduverse-notifications-updated")
    );

    setNotifications(updated);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
    setNotifications(getNotifications());
  };

  const handleViewAll = () => {
    onClose?.();
    navigate("/notifications");
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "course":
      case "enrollment":
        return <BookOpen size={19} />;

      case "quiz":
        return <ClipboardCheck size={19} />;

      case "achievement":
        return <Trophy size={19} />;

      default:
        return <Bell size={19} />;
    }
  };

  return (
    <div className="notification-dropdown">

      <div className="notification-dropdown-header">
        <div>
          <h3>Notifications</h3>
          <span>
            {unreadCount} unread notifications
          </span>
        </div>

        <div className="notification-dropdown-header-actions">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              title="Mark all as read"
            >
              <CheckCheck size={17} />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            title="Close notifications"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="notification-dropdown-list">

        {notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification) => (
            <div
              className={`notification-dropdown-item ${
                !notification.read ? "unread" : ""
              }`}
              key={notification.id}
            >

              <div className="notification-dropdown-icon">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notification-dropdown-content">
                <h4>{notification.title}</h4>

                <p>{notification.message}</p>

                <span>{notification.time}</span>

                <div className="notification-dropdown-actions">
                  {!notification.read && (
                    <button
                      type="button"
                      onClick={() =>
                        handleMarkRead(notification.id)
                      }
                    >
                      <Check size={14} />
                      Mark as read
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(notification.id)
                    }
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="notification-dropdown-empty">
            <Bell size={30} />
            <h4>No notifications</h4>
            <p>You're all caught up!</p>
          </div>
        )}

      </div>

      <button
        type="button"
        className="notification-view-all"
        onClick={handleViewAll}
      >
        View all notifications
        <ArrowRight size={17} />
      </button>

    </div>
  );
}

export default NotificationList;

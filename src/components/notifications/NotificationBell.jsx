
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { getNotifications } from '../../data/notifications';

function NotificationBell({ onClick }) {
  const [unreadCount, setUnreadCount] = useState(() =>
    getNotifications().filter((item) => !item.read).length
  );

  useEffect(() => {
    const updateCount = () => {
      const latest = getNotifications();

      setUnreadCount(
        latest.filter((item) => !item.read).length
      );
    };

    window.addEventListener(
      'eduverse-notifications-updated',
      updateCount
    );

    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener(
        'eduverse-notifications-updated',
        updateCount
      );

      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <button
      type="button"
      className="topbar-icon-button notification-bell-button"
      onClick={onClick}
      aria-label="Open notifications"
      title="Notifications"
    >
      <Bell size={22} strokeWidth={2} />

      {unreadCount > 0 && (
        <span className="notification-dot">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}

export default NotificationBell;


import { useEffect, useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';

import { getNotifications } from '../../data/notifications';

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

function Toast({
  message,
  type = 'success',
  onClose,
  className = '',
  global = false,
}) {
  const [globalMessage, setGlobalMessage] = useState('');
  const [globalType, setGlobalType] = useState('success');

  useEffect(() => {
    if (!global) return;

    let timeout;

    const showNotification = (event) => {
      if (event.type !== 'eduverse-notification-created') return;

      const notification = event.detail;

      if (!notification) return;

      setGlobalMessage(`${notification.title}: ${notification.message}`);
      setGlobalType('success');

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setGlobalMessage('');
      }, 4000);
    };

    window.addEventListener(
      'eduverse-notification-created',
      showNotification
    );

    return () => {
      window.removeEventListener(
        'eduverse-notification-created',
        showNotification
      );

      clearTimeout(timeout);
    };
  }, [global]);

  const displayedMessage = global ? globalMessage : message;
  const displayedType = global ? globalType : type;

  const Icon = toastIcons[displayedType] || Info;

  if (!displayedMessage) return null;

  return (
    <div
      className={`common-toast common-toast-${displayedType} ${className}`}
      role="alert"
    >
      <Icon size={21} className="common-toast-icon" />

      <p>{displayedMessage}</p>

      <button
        type="button"
        className="common-toast-close"
        onClick={() => {
          if (global) {
            setGlobalMessage('');
          } else {
            onClose?.();
          }
        }}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;

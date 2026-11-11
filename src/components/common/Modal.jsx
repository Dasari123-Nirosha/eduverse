
import { useEffect } from 'react';
import { X } from 'lucide-react';

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlay = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (
      closeOnOverlay &&
      event.target === event.currentTarget
    ) {
      onClose?.();
    }
  };

  return (
    <div
      className="common-modal-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        className={`common-modal common-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="common-modal-title"
      >
        <div className="common-modal-header">
          <h2 id="common-modal-title">{title}</h2>

          <button
            type="button"
            className="common-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        <div className="common-modal-body">
          {children}
        </div>

        {footer && (
          <div className="common-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;

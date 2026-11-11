
import { LoaderCircle } from 'lucide-react';

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      className={`common-btn common-btn-${variant} common-btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <LoaderCircle className="common-btn-loader" size={17} />
      )}

      {children}
    </button>
  );
}

export default Button;

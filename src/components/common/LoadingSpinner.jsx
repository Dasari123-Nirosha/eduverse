
import { LoaderCircle } from 'lucide-react';

function LoadingSpinner({
  size = 'medium',
  text = 'Loading...',
  showText = true,
  className = '',
}) {
  return (
    <div className={`common-loading-spinner ${className}`}>
      <LoaderCircle
        className={`common-spinner-icon common-spinner-${size}`}
      />

      {showText && (
        <p>{text}</p>
      )}
    </div>
  );
}

export default LoadingSpinner;

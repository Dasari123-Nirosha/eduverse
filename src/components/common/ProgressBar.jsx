
function ProgressBar({
  progress = 0,
  label,
  showPercentage = true,
  color = 'primary',
  size = 'medium',
}) {
  const percentage = Math.min(
    100,
    Math.max(0, Number(progress) || 0)
  );

  return (
    <div className="common-progress-container">
      {(label || showPercentage) && (
        <div className="common-progress-header">
          {label && (
            <span className="common-progress-label">
              {label}
            </span>
          )}

          {showPercentage && (
            <span className="common-progress-percentage">
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        className={`common-progress-track common-progress-${size}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div
          className={`common-progress-fill common-progress-${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

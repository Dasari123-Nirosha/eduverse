
function Badge({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
}) {
  return (
    <span
      className={`common-badge common-badge-${variant} common-badge-${size} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;

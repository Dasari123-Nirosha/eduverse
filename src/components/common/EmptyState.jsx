
import { Inbox } from 'lucide-react';

function EmptyState({
  icon: Icon = Inbox,
  title = 'No Data Found',
  description = 'There is nothing to display here yet.',
  action,
  className = '',
}) {
  return (
    <div className={`common-empty-state ${className}`}>
      <div className="common-empty-icon">
        <Icon size={35} />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {action && (
        <div className="common-empty-action">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;

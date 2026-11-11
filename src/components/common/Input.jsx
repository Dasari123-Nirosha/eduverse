
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType =
    isPassword && showPassword ? 'text' : type;

  return (
    <div className={`common-input-group ${className}`}>
      {label && (
        <label htmlFor={name} className="common-input-label">
          {label}
          {required && <span className="common-input-required">*</span>}
        </label>
      )}

      <div
        className={`common-input-wrapper ${error ? 'has-error' : ''}`}
      >
        {Icon && (
          <Icon size={18} className="common-input-icon" />
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="common-input"
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="common-input-password-toggle"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="common-input-error">{error}</span>
      )}
    </div>
  );
}

export default Input;

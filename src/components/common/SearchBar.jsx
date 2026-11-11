
import { Search, X } from 'lucide-react';

function SearchBar({
  value,
  onChange,
  placeholder = 'Search here...',
  className = '',
  disabled = false,
}) {
  const handleClear = () => {
    onChange?.('');
  };

  return (
    <div className={`common-search-bar ${className}`}>
      <Search size={19} className="common-search-icon" />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={placeholder}
      />

      {value && (
        <button
          type="button"
          className="common-search-clear"
          onClick={handleClear}
          aria-label="Clear search"
          disabled={disabled}
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

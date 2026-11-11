
import { ArrowDownUp } from 'lucide-react';

function CourseSorting({
  sortBy = 'default',
  onSortChange,
}) {
  return (
    <div className="catalogue-sort">
      <ArrowDownUp size={18} />

      <select
        id="course-sort"
        value={sortBy}
        onChange={(event) => onSortChange?.(event.target.value)}
        aria-label="Sort courses"
      >
        <option value="default">Default Order</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}

export default CourseSorting;

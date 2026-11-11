
function CategoryFilter({
  categories = [],
  selectedCategory = 'All',
  onCategoryChange,
}) {
  const categoryList = [
    'All',
    ...categories.filter(
      (category) => category && category !== 'All'
    ),
  ];

  return (
    <div className="catalogue-categories">
      {categoryList.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-button ${
            selectedCategory === category ? 'active' : ''
          }`}
          onClick={() => onCategoryChange?.(category)}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;

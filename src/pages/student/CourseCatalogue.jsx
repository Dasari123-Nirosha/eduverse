
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Search,
  BookOpen,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useWishlist } from '../../context/WishlistContext';

import CategoryFilter from '../../components/courses/CategoryFilter';
import CourseSorting from '../../components/courses/CourseSorting';
import CourseGrid from '../../components/courses/CourseGrid';

import Pagination from '../../components/common/Pagination';
import Toast from '../../components/common/Toast';

const defaultCategories = [
  'Web Development',
  'Programming',
  'Design',
  'Data Science',
  'Marketing',
  'Technology',
];

const COURSES_PER_PAGE = 5;

function CourseCatalogue() {
  const { courses = [] } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get('search') || ''
  );

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();

  // Synchronize search when URL changes.
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  // Synchronize search input with URL.
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';

    if (searchTerm.trim() === currentSearch) return;

    const updatedParams = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      updatedParams.set('search', searchTerm.trim());
    } else {
      updatedParams.delete('search');
    }

    setSearchParams(updatedParams, { replace: true });
  }, [searchTerm]);

  // Get all available categories.
  const categories = useMemo(() => {
    const courseCategories = courses
      .map((course) => course.category)
      .filter(Boolean);

    return [
      ...new Set([
        ...defaultCategories,
        ...courseCategories,
      ]),
    ];
  }, [courses]);

  // Toast timeout.
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Wishlist functionality.
  const handleWishlistToggle = (course) => {
    const alreadySaved = isWishlisted(course.id);

    toggleWishlist(course.id);

    setToast({
      message: alreadySaved
        ? `${course.title} removed from wishlist.`
        : `${course.title} added to wishlist!`,
      type: 'success',
    });
  };

  // Search, category filtering and sorting.
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (selectedCategory !== 'All') {
      result = result.filter(
        (course) => course.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.trim().toLowerCase();

      result = result.filter((course) => {
        const title = course.title || '';
        const category = course.category || '';
        const description = course.description || '';

        const instructor =
          typeof course.instructor === 'string'
            ? course.instructor
            : course.instructor?.name || '';

        const instructorRole = course.instructorRole || '';
        const level = course.level || '';

        return (
          title.toLowerCase().includes(search) ||
          category.toLowerCase().includes(search) ||
          description.toLowerCase().includes(search) ||
          instructor.toLowerCase().includes(search) ||
          instructorRole.toLowerCase().includes(search) ||
          level.toLowerCase().includes(search)
        );
      });
    }

    if (sortBy === 'popular') {
      result.sort(
        (a, b) => (b.students || 0) - (a.students || 0)
      );
    } else if (sortBy === 'rating') {
      result.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    } else if (sortBy === 'price-low') {
      result.sort(
        (a, b) => (a.price || 0) - (b.price || 0)
      );
    } else if (sortBy === 'price-high') {
      result.sort(
        (a, b) => (b.price || 0) - (a.price || 0)
      );
    }

    return result;
  }, [courses, searchTerm, selectedCategory, sortBy]);

  // Pagination.
  const totalPages = Math.ceil(
    filteredCourses.length / COURSES_PER_PAGE
  );

  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;

  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );

  // Reset page when search or filters change.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Handle pagination.
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Clear all filters.
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('popular');
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="course-catalogue-page">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Catalogue Header */}
      <div className="catalogue-header">
        <div>
          <p>EXPLORE AND LEARN</p>

          <h1>Course Catalogue</h1>

          <span>
            Discover courses and develop skills for your future.
          </span>
        </div>

        <div className="catalogue-total">
          <BookOpen size={22} />
          <span>{courses.length} Courses Available</span>
        </div>
      </div>

      {/* Search and Sorting */}
      <div className="catalogue-toolbar">
        <div className="catalogue-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <CourseSorting
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Course Results */}
      <div className="catalogue-results">
        <h2>Explore Courses</h2>

        <span>
          {filteredCourses.length} courses found
        </span>
      </div>

      {/* Course Grid */}
      {currentCourses.length > 0 ? (
        <>
          <CourseGrid
            courses={currentCourses}
            isWishlisted={isWishlisted}
            onToggleWishlist={handleWishlistToggle}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <p className="catalogue-page-info">
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + COURSES_PER_PAGE,
              filteredCourses.length
            )}{' '}
            of {filteredCourses.length} courses
          </p>
        </>
      ) : (
        <div className="catalogue-empty">
          <BookOpen size={40} />

          <h3>No courses found</h3>

          <p>
            Try another search or select a different category.
          </p>

          <button type="button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}

export default CourseCatalogue;

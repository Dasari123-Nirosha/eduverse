
 // Find a course using its ID
export const findCourseById = (courses = [], courseId) => {
  if (!Array.isArray(courses)) {
    return null;
  }

  return courses.find(
    (course) => String(course.id) === String(courseId)
  ) || null;
};

// Search courses by title, category, instructor or description
export const searchCourses = (courses = [], searchTerm = '') => {
  if (!Array.isArray(courses)) {
    return [];
  }

  const search = searchTerm.trim().toLowerCase();

  if (!search) {
    return courses;
  }

  return courses.filter((course) => {
    const instructor = typeof course.instructor === 'object'
      ? course.instructor?.name
      : course.instructor;

    return [
      course.title,
      course.category,
      course.description,
      course.level,
      instructor
    ].some((value) =>
      String(value || '').toLowerCase().includes(search)
    );
  });
};

// Filter courses by category
export const filterCoursesByCategory = (
  courses = [],
  category = 'All'
) => {
  if (!Array.isArray(courses)) {
    return [];
  }

  if (!category || category === 'All') {
    return courses;
  }

  return courses.filter(
    (course) => course.category === category
  );
};

// Filter courses by difficulty level
export const filterCoursesByLevel = (
  courses = [],
  level = 'All'
) => {
  if (!Array.isArray(courses)) {
    return [];
  }

  if (!level || level === 'All') {
    return courses;
  }

  return courses.filter(
    (course) => course.level === level
  );
};

// Sort courses
export const sortCourses = (courses = [], sortBy = 'default') => {
  if (!Array.isArray(courses)) {
    return [];
  }

  const sortedCourses = [...courses];

  switch (sortBy) {
    case 'price-low':
      return sortedCourses.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );

    case 'price-high':
      return sortedCourses.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );

    case 'rating':
      return sortedCourses.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );

    case 'popular':
      return sortedCourses.sort(
        (a, b) => Number(b.students || 0) - Number(a.students || 0)
      );

    case 'newest':
      return sortedCourses.sort(
        (a, b) => Number(b.id) - Number(a.id)
      );

    case 'default':
    default:
      return sortedCourses;
  }
};

// Get unique course categories
export const getCourseCategories = (courses = []) => {
  if (!Array.isArray(courses)) {
    return [];
  }

  return [
    ...new Set(
      courses
        .map((course) => course.category)
        .filter(Boolean)
    )
  ];
};

// Calculate total number of courses
export const getTotalCourses = (courses = []) => {
  return Array.isArray(courses) ? courses.length : 0;
};

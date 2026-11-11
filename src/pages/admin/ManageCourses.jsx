
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useNotifications } from '../../context/NotificationContext';

function ManageCourses() {
  const navigate = useNavigate();

  const { courses, deleteCourse } = useCourses();
  const { createNotification } = useNotifications();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 5;

  // Get available categories
  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        courses
          .map((course) => course.category)
          .filter(Boolean)
      ),
    ];
  }, [courses]);

  // Search and category filtering
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const instructor =
        typeof course.instructor === 'string'
          ? course.instructor
          : course.instructor?.name || '';

      const matchesSearch = [
        course.title || '',
        course.category || '',
        instructor,
      ].some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesCategory =
        selectedCategory === 'All' ||
        course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / coursesPerPage)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * coursesPerPage;

  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  // Delete course using CourseContext
  const handleDelete = (courseId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this course?'
    );

    if (!confirmed) return;

    const deletedCourse = courses.find(
      (course) => String(course.id) === String(courseId)
    );

    if (!deletedCourse) {
      alert('Course not found.');
      return;
    }

    try {
      deleteCourse(courseId);

      // Create delete notification
      try {
        createNotification({
          title: 'Course Deleted',
          message: `${deletedCourse.title || 'A course'} has been successfully deleted.`,
          type: 'course',
        });
      } catch (notificationError) {
        console.error(
          'Course deleted, but notification could not be created:',
          notificationError
        );
      }

      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Unable to delete course:', error);
      alert('Unable to delete course. Please try again.');
    }
  };

  return (
    <div className="admin-manage-courses">

      {/* PAGE HEADER */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">
            COURSE MANAGEMENT
          </p>

          <h1>Manage Courses</h1>

          <p>
            View, organize, edit and manage your learning courses.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={() => navigate('/admin/courses/add')}
        >
          <Plus size={18} />
          Add New Course
        </button>
      </div>

      {/* SEARCH AND CATEGORY FILTER */}
      <div className="admin-course-toolbar">
        <div className="admin-search-box">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          className="admin-category-filter"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* COURSE SUMMARY */}
      <div className="admin-course-summary">
        <div>
          <h2>{filteredCourses.length}</h2>
          <p>Courses found</p>
        </div>

        <BookOpen size={30} />
      </div>

      {/* COURSE TABLE */}
      <div className="admin-course-table-wrapper">
        <table className="admin-course-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCourses.map((course) => {
              const instructor =
                typeof course.instructor === 'string'
                  ? course.instructor
                  : course.instructor?.name || 'Not assigned';

              return (
                <tr key={course.id}>
                  <td>
                    <div className="admin-table-course">
                      <img
                        src={course.image}
                        alt={course.title}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />

                      <span>{course.title}</span>
                    </div>
                  </td>

                  <td>{course.category || 'General'}</td>

                  <td>{instructor}</td>

                  <td>{course.duration || 'Not specified'}</td>

                  <td>
                    <span className="admin-course-status">
                      {course.status || 'Available'}
                    </span>
                  </td>

                  <td>
                    <div className="admin-table-actions">

                      <button
                        title="Preview Course"
                        onClick={() =>
                          navigate(
                            `/admin/courses/preview/${course.id}`
                          )
                        }
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit Course"
                        onClick={() =>
                          navigate(
                            `/admin/courses/edit/${course.id}`
                          )
                        }
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete Course"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredCourses.length === 0 && (
          <div className="admin-empty-state">
            <BookOpen size={35} />

            <h3>No courses found</h3>

            <p>
              Try changing your search or category filter.
            </p>
          </div>
        )}
      </div>

      {/* COURSE PAGINATION */}
      {filteredCourses.length > coursesPerPage && (
        <div className="admin-dashboard-pagination">

          <p>
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + coursesPerPage,
              filteredCourses.length
            )}{' '}
            of {filteredCourses.length} courses
          </p>

          <div className="admin-pagination-controls">

            <button
              className="admin-pagination-arrow"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={`admin-pagination-number ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(page)}
                aria-current={
                  currentPage === page ? 'page' : undefined
                }
              >
                {page}
              </button>
            ))}

            <button
              className="admin-pagination-arrow"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default ManageCourses;

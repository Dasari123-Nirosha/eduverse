
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BookOpen,
  Users,
  GraduationCap,
  CheckCircle,
  Plus,
  ArrowRight,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  BookPlus,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import initialCourses from '../../data/courses';

function AdminDashboard() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 5;

  const { courses = [] } = useCourses();

  const {
    totalStudents = 0,
    totalEnrollments = 0,
  } = useEnrollment();

  const originalCourseIds = useMemo(
    () => new Set(initialCourses.map((course) => String(course.id))),
    []
  );

  const totalCourses = courses.length;

  const publishedCourses = courses.filter(
    (course) =>
      !course.status ||
      String(course.status).toLowerCase() === 'published'
  ).length;

  const newCourses = courses.filter(
    (course) => !originalCourseIds.has(String(course.id))
  );

  const recentCourses = useMemo(() => {
    return [...courses].reverse();
  }, [courses]);

  const totalPages = Math.max(
    1,
    Math.ceil(totalCourses / coursesPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * coursesPerPage;

  const currentCourses = recentCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const stats = [
    {
      title: 'Total Courses',
      value: totalCourses.toLocaleString('en-IN'),
      icon: BookOpen,
    },
    {
      title: 'New Courses',
      value: newCourses.length.toLocaleString('en-IN'),
      icon: BookPlus,
    },
    {
      title: 'Total Students',
      value: Number(totalStudents).toLocaleString('en-IN'),
      icon: Users,
    },
    {
      title: 'Total Enrollments',
      value: Number(totalEnrollments).toLocaleString('en-IN'),
      icon: GraduationCap,
    },
    {
      title: 'Published Courses',
      value: publishedCourses.toLocaleString('en-IN'),
      icon: CheckCircle,
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* 1. ADMIN DASHBOARD HEADER */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">ADMIN PANEL</p>
          <h1>Admin Dashboard</h1>
          <p>
            Manage your courses and monitor your learning platform.
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

      {/* 2. WELCOME SECTION */}
      <div className="admin-welcome-card">
        <div>
          <span>WELCOME TO EDUVERSE</span>
          <h2>Manage Your Learning Platform</h2>
          <p>
            Keep your courses organized and help students continue
            their learning journey.
          </p>
        </div>

        <div className="admin-welcome-icon">
          <LayoutDashboard size={54} />
        </div>
      </div>

      {/* 3. DASHBOARD STATISTICS */}
      <section className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="admin-stat-card" key={stat.title}>
              <div className="admin-stat-icon">
                <Icon size={23} />
              </div>

              <div>
                <p>{stat.title}</p>
                <h2>{stat.value}</h2>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. RECENT COURSES */}
      <section className="admin-dashboard-section">
        <div className="admin-section-heading">
          <div>
            <h2>Recent Courses</h2>
            <p>Your available courses at a glance.</p>
          </div>

          <button
            className="admin-text-button"
            onClick={() => navigate('/admin/courses')}
          >
            View All <ArrowRight size={17} />
          </button>
        </div>

        <div className="admin-recent-courses">
          {currentCourses.map((course) => (
            <div
              className="admin-recent-course"
              key={course.id}
            >
              <div className="admin-course-icon">
                <BookOpen size={21} />
              </div>

              <div className="admin-recent-course-info">
                <h3>{course.title}</h3>
                <p>{course.category || 'General'}</p>
              </div>

              <span className="admin-course-status">
                {course.status || 'Published'}
              </span>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="admin-empty-state">
              <BookOpen size={35} />
              <h3>No courses available</h3>
              <p>Add your first course to get started.</p>
            </div>
          )}
        </div>

        {/* 5. RECENT COURSES PAGINATION */}
        {totalCourses > coursesPerPage && (
          <div className="admin-dashboard-pagination">
            <p>
              Showing {startIndex + 1}–
              {Math.min(startIndex + coursesPerPage, totalCourses)}
              {' '}of {totalCourses} courses
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
      </section>

      {/* 6. QUICK ACTIONS */}
      <section className="admin-quick-actions">
        <h2>Quick Actions</h2>

        <div className="admin-actions-grid">
          <button
            className="admin-action-card"
            onClick={() => navigate('/admin/courses')}
          >
            <BookOpen size={25} />
            <span>Manage Courses</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="admin-action-card"
            onClick={() => navigate('/admin/courses/add')}
          >
            <Plus size={25} />
            <span>Add New Course</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
}

export default AdminDashboard;

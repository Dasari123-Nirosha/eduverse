
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  Save,
  Pencil,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useNotifications } from '../../context/NotificationContext';

function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { getCourseById, updateCourse } = useCourses();
  const { createNotification } = useNotifications();

  const [formData, setFormData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const selectedCourse = getCourseById(courseId);

    if (selectedCourse) {
      setFormData({
        title: selectedCourse.title || '',
        category: selectedCourse.category || '',
        instructor:
          typeof selectedCourse.instructor === 'string'
            ? selectedCourse.instructor
            : selectedCourse.instructor?.name || '',
        description: selectedCourse.description || '',
        duration: selectedCourse.duration || '',
        image: selectedCourse.image || '',
        price: selectedCourse.price ?? '',
        status: selectedCourse.status || 'Published',
      });

      setNotFound(false);
    } else {
      setFormData(null);
      setNotFound(true);
    }
  }, [courseId, getCourseById]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    const category = formData.category.trim();
    const instructor = formData.instructor.trim();
    const description = formData.description.trim();
    const duration = formData.duration.trim();
    const price = Number(formData.price || 0);

    if (
      !title ||
      !category ||
      !instructor ||
      !description ||
      !duration
    ) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setErrorMessage('Please enter a valid course price.');
      return;
    }

    const selectedCourse = getCourseById(courseId);

    if (!selectedCourse) {
      setNotFound(true);
      return;
    }

    try {
      updateCourse(courseId, {
        ...formData,
        title,
        category,
        instructor,
        description,
        duration,
        image: formData.image.trim(),
        price,
      });

      try {
        createNotification({
          title: 'Course Updated',
          message: `${title} course details have been successfully updated.`,
          type: 'course',
        });
      } catch (notificationError) {
        console.error(
          'Course updated, but notification could not be created:',
          notificationError
        );
      }

      alert('Course updated successfully!');
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error updating course:', error);
      setErrorMessage(
        'Unable to update course. Please try again.'
      );
    }
  };

  if (notFound) {
    return (
      <div className="admin-empty-state">
        <h2>Course not found</h2>

        <p>
          The course you are trying to edit does not exist.
        </p>

        <button
          className="admin-primary-button"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="admin-loading">
        Loading course...
      </div>
    );
  }

  return (
    <div className="admin-edit-course">

      {/* 1. PAGE HEADER */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">
            COURSE MANAGEMENT
          </p>

          <h1>Edit Course</h1>

          <p>
            Update the details of your existing course.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>
      </div>

      {/* 2. EDIT COURSE FORM */}
      <form
        className="admin-course-form"
        onSubmit={handleSubmit}
      >

        <div className="admin-form-heading">
          <Pencil size={24} />

          <div>
            <h2>Update Course Information</h2>
            <p>
              Make your changes and save the updated course.
            </p>
          </div>
        </div>

        {errorMessage && (
          <p className="admin-form-error" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="admin-form-grid">

          <div className="admin-form-group">
            <label htmlFor="title">
              Course Title *
            </label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="category">
              Category *
            </label>

            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="instructor">
              Instructor *
            </label>

            <input
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="duration">
              Duration *
            </label>

            <input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="price">
              Course Price
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="status">
              Course Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="admin-form-group admin-full-width">
            <label htmlFor="image">
              Course Image URL
            </label>

            <input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/courses/course-image.jpg"
            />
          </div>

          <div className="admin-form-group admin-full-width">
            <label htmlFor="description">
              Course Description *
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        {/* 3. FORM ACTIONS */}
        <div className="admin-form-actions">

          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => navigate('/admin/courses')}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-primary-button"
          >
            <Save size={18} />
            Update Course
          </button>

        </div>
      </form>
    </div>
  );
}

export default EditCourse;

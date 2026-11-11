
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  Save,
  BookOpen,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useNotifications } from '../../context/NotificationContext';

function AddCourse() {
  const navigate = useNavigate();

  const { courses = [], addCourse } = useCourses();
  const { createNotification } = useNotifications();

  const categories = useMemo(() => {
    return [
      ...new Set(
        courses.map((course) => course.category).filter(Boolean)
      ),
    ];
  }, [courses]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    instructor: '',
    description: '',
    duration: '',
    image: '',
    price: '',
    status: 'Published',
  });

  const [errorMessage, setErrorMessage] = useState('');

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

    const duplicateCourse = courses.some(
      (course) =>
        course.title?.trim().toLowerCase() ===
        title.toLowerCase()
    );

    if (duplicateCourse) {
      setErrorMessage(
        'A course with this title already exists.'
      );
      return;
    }

    const newCourse = {
      title,
      category,
      instructor,
      description,
      duration,
      image: formData.image.trim(),
      price,
      status: formData.status,
      rating: 0,
      students: 0,
      lessons: 0,
      level: 'Beginner',
    };

    try {
      const savedCourse = addCourse(newCourse);

      if (!savedCourse) {
        throw new Error('Course could not be saved.');
      }

      try {
        createNotification({
          title: 'New Course Added',
          message: `${savedCourse.title} has been successfully added to EduVerse.`,
          type: 'course',
        });
      } catch (notificationError) {
        console.error(
          'Course added, but notification could not be created:',
          notificationError
        );
      }

      alert('Course added successfully!');
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error adding course:', error);
      setErrorMessage(
        'Unable to add course. Please try again.'
      );
    }
  };

  return (
    <div className="admin-add-course">

      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">
            COURSE MANAGEMENT
          </p>

          <h1>Add New Course</h1>

          <p>
            Create and publish a new learning course.
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

      <form
        className="admin-course-form"
        onSubmit={handleSubmit}
      >

        <div className="admin-form-heading">
          <BookOpen size={24} />

          <div>
            <h2>Course Information</h2>
            <p>Enter the details of your new course.</p>
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
              placeholder="Enter course title"
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
              list="course-categories"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter or select category"
              required
            />

            <datalist id="course-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
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
              placeholder="Enter instructor name"
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
              placeholder="Example: 8 weeks"
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
              placeholder="Enter course price"
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
              type="text"
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
              placeholder="Describe what students will learn..."
              required
            />
          </div>

        </div>

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
            Save Course
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddCourse;

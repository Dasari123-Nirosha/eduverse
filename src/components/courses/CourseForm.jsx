
import { useEffect, useState } from 'react';

const initialFormData = {
  title: '',
  description: '',
  category: '',
  instructor: '',
  duration: '',
  price: '',
  level: 'Beginner',
  image: '',
};

function CourseForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Save Course',
}) {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...initialData,
    price: initialData.price ?? '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      ...initialFormData,
      ...initialData,
      price: initialData.price ?? '',
    });
    setErrors({});
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required.';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Please enter a course category.';
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor name is required.';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Course duration is required.';
    }

    if (
      formData.price === '' ||
      Number.isNaN(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      newErrors.price = 'Enter a valid price.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit?.({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <div className="course-form-group">
        <label htmlFor="course-title">Course Title *</label>
        <input
          id="course-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter course title"
        />
        {errors.title && <small className="course-form-error">{errors.title}</small>}
      </div>

      <div className="course-form-group">
        <label htmlFor="course-description">Description *</label>
        <textarea
          id="course-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter course description"
          rows="5"
        />
        {errors.description && (
          <small className="course-form-error">{errors.description}</small>
        )}
      </div>

      <div className="course-form-row">
        <div className="course-form-group">
          <label htmlFor="course-category">Category *</label>
          <input
            id="course-category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Web Development"
          />
          {errors.category && (
            <small className="course-form-error">{errors.category}</small>
          )}
        </div>

        <div className="course-form-group">
          <label htmlFor="course-instructor">Instructor *</label>
          <input
            id="course-instructor"
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Enter instructor name"
          />
          {errors.instructor && (
            <small className="course-form-error">{errors.instructor}</small>
          )}
        </div>
      </div>

      <div className="course-form-row">
        <div className="course-form-group">
          <label htmlFor="course-duration">Duration *</label>
          <input
            id="course-duration"
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 8 weeks"
          />
          {errors.duration && (
            <small className="course-form-error">{errors.duration}</small>
          )}
        </div>

        <div className="course-form-group">
          <label htmlFor="course-price">Price (₹) *</label>
          <input
            id="course-price"
            type="number"
            name="price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter course price"
          />
          {errors.price && (
            <small className="course-form-error">{errors.price}</small>
          )}
        </div>
      </div>

      <div className="course-form-row">
        <div className="course-form-group">
          <label htmlFor="course-level">Course Level</label>
          <select
            id="course-level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="course-form-group">
          <label htmlFor="course-image">Course Image URL</label>
          <input
            id="course-image"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/courses/course.jpg"
          />
        </div>
      </div>

      <button type="submit" className="course-form-submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default CourseForm;

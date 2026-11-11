
// Check whether a value is empty
export const isRequired = (value) => {
  return value !== null &&
    value !== undefined &&
    String(value).trim() !== '';
};

// Validate email address
export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(String(email || '').trim());
};

// Validate phone number
export const isValidPhone = (phone) => {
  const phonePattern = /^\+?[0-9\s()-]{7,15}$/;

  return phonePattern.test(String(phone || '').trim());
};

// Validate password
export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 8;
};

// Validate course form
export const validateCourseForm = (course) => {
  const errors = {};

  if (!isRequired(course.title)) {
    errors.title = 'Course title is required.';
  }

  if (!isRequired(course.category)) {
    errors.category = 'Please select a course category.';
  }

  if (!isRequired(course.description)) {
    errors.description = 'Course description is required.';
  }

  if (!isRequired(course.instructor)) {
    errors.instructor = 'Instructor name is required.';
  }

  if (
    course.price === '' ||
    course.price === null ||
    course.price === undefined ||
    !Number.isFinite(Number(course.price)) ||
    Number(course.price) < 0
  ) {
    errors.price = 'Please enter a valid course price.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate student profile form
export const validateProfileForm = (profile) => {
  const errors = {};

  if (!isRequired(profile.name)) {
    errors.name = 'Name is required.';
  }

  if (!isValidEmail(profile.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (profile.phone && !isValidPhone(profile.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate a general form using required field names
export const validateRequiredFields = (formData, fields = []) => {
  const errors = {};

  fields.forEach((field) => {
    if (!isRequired(formData[field])) {
      errors[field] = `${field} is required.`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

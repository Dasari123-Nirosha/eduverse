
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import initialCourses from '../data/courses';

const CourseContext = createContext();

const STORAGE_KEY = 'eduverse-courses';

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    try {
      const savedCourses = localStorage.getItem(STORAGE_KEY);

      if (savedCourses) {
        const parsedCourses = JSON.parse(savedCourses);

        if (Array.isArray(parsedCourses)) {
          return parsedCourses;
        }
      }

      return initialCourses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return initialCourses;
    }
  });

  // Save courses whenever the course list changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(courses)
      );
    } catch (error) {
      console.error('Error saving courses:', error);
    }
  }, [courses]);

  // Generate a unique course ID
  const generateCourseId = (existingCourses) => {
    let newId;

    do {
      newId = `course-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
    } while (
      existingCourses.some(
        (course) => String(course.id) === newId
      )
    );

    return newId;
  };

  // Add a new course
  const addCourse = (courseData) => {
    if (!courseData || typeof courseData !== 'object') {
      throw new Error('Invalid course information.');
    }

    const newCourse = {
      ...courseData,
      id: generateCourseId(courses),
    };

    setCourses((previousCourses) => [
      ...previousCourses,
      newCourse,
    ]);

    return newCourse;
  };

  // Update an existing course
  const updateCourse = (courseId, updatedData) => {
    if (!updatedData || typeof updatedData !== 'object') {
      throw new Error('Invalid course information.');
    }

    setCourses((previousCourses) =>
      previousCourses.map((course) =>
        String(course.id) === String(courseId)
          ? {
              ...course,
              ...updatedData,
              id: course.id,
            }
          : course
      )
    );
  };

  // Delete a course without deleting enrollment records
  const deleteCourse = (courseId) => {
    setCourses((previousCourses) =>
      previousCourses.filter(
        (course) =>
          String(course.id) !== String(courseId)
      )
    );
  };

  // Get a course using its ID
  const getCourseById = (courseId) => {
    return courses.find(
      (course) =>
        String(course.id) === String(courseId)
    );
  };

  const value = {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error(
      'useCourses must be used inside a CourseProvider'
    );
  }

  return context;
}

export default CourseContext;

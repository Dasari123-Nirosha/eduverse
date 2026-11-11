
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const EnrollmentContext = createContext();

const STORAGE_KEY = 'eduverse-enrollments';

function getStudentProfile() {
  try {
    return JSON.parse(
      localStorage.getItem('eduverse-student-profile') || '{}'
    );
  } catch {
    return {};
  }
}

function normalizeIdentifier(value) {
  return String(value || '').trim().toLowerCase();
}

function getSavedEnrollments() {
  try {
    const savedEnrollments = localStorage.getItem(STORAGE_KEY);

    if (!savedEnrollments) return [];

    const enrollments = JSON.parse(savedEnrollments);

    return Array.isArray(enrollments) ? enrollments : [];
  } catch (error) {
    console.error('Unable to load enrollments:', error);
    return [];
  }
}

export function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState(
    getSavedEnrollments
  );

  // Keep the latest records available to every update function.
  const enrollmentsRef = useRef(enrollments);

  // Save changes immediately instead of waiting for useEffect.
  const saveEnrollments = (updatedEnrollments) => {
    enrollmentsRef.current = updatedEnrollments;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedEnrollments)
      );
    } catch (error) {
      console.error('Unable to save enrollments:', error);
    }

    setEnrollments(updatedEnrollments);

    return updatedEnrollments;
  };

  // Synchronize changes made in another browser tab.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== STORAGE_KEY) return;

      try {
        const savedData = event.newValue
          ? JSON.parse(event.newValue)
          : [];

        if (Array.isArray(savedData)) {
          enrollmentsRef.current = savedData;
          setEnrollments(savedData);
        }
      } catch (error) {
        console.error('Unable to sync enrollments:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(
        'storage',
        handleStorageChange
      );
    };
  }, []);

  // Add a new student enrollment.
  const addEnrollment = (enrollmentData) => {
    if (
      !enrollmentData ||
      enrollmentData.courseId === undefined ||
      enrollmentData.courseId === null
    ) {
      return null;
    }

    const profile = getStudentProfile();

    const studentEmail = normalizeIdentifier(
      enrollmentData.studentEmail || profile.email
    );

    const studentId = normalizeIdentifier(
      enrollmentData.studentId
    );

    if (!studentEmail && !studentId) {
      return null;
    }

    const currentEnrollments = enrollmentsRef.current;

    const alreadyEnrolled = currentEnrollments.some(
      (enrollment) => {
        const sameCourse =
          String(enrollment.courseId) ===
          String(enrollmentData.courseId);

        const sameStudent =
          (
            studentEmail &&
            normalizeIdentifier(enrollment.studentEmail) ===
              studentEmail
          ) ||
          (
            studentId &&
            normalizeIdentifier(enrollment.studentId) ===
              studentId
          );

        return sameCourse && sameStudent;
      }
    );

    if (alreadyEnrolled) {
      return null;
    }

    const newEnrollment = {
      ...enrollmentData,
      studentEmail,
      studentId: enrollmentData.studentId || '',
      studentName:
        enrollmentData.studentName ||
        profile.name ||
        'Student',
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      status: 'Active',
      certificateIssued: false,
      certificate: null,
      completedLessonIds: [],
    };

    saveEnrollments([
      ...currentEnrollments,
      newEnrollment,
    ]);

    return newEnrollment;
  };

  // Remove an enrollment.
  const removeEnrollment = (enrollmentId) => {
    const updatedEnrollments = enrollmentsRef.current.filter(
      (enrollment) =>
        String(enrollment.id) !== String(enrollmentId)
    );

    saveEnrollments(updatedEnrollments);
  };

  // Update course progress and certificate details.
  const updateEnrollment = (enrollmentId, updatedData) => {
    if (!enrollmentId || !updatedData) return;

    const currentEnrollments = enrollmentsRef.current;

    const enrollmentExists = currentEnrollments.some(
      (enrollment) =>
        String(enrollment.id) === String(enrollmentId)
    );

    if (!enrollmentExists) {
      console.error(
        'Enrollment not found for update:',
        enrollmentId
      );
      return;
    }

    const updatedEnrollments = currentEnrollments.map(
      (enrollment) => {
        if (
          String(enrollment.id) !== String(enrollmentId)
        ) {
          return enrollment;
        }

        return {
          ...enrollment,
          ...updatedData,
          id: enrollment.id,
        };
      }
    );

    // Persist completion and certificate changes immediately.
    saveEnrollments(updatedEnrollments);
  };

  // Get enrollments for a course.
  const getEnrollmentsByCourse = (courseId) => {
    return enrollments.filter(
      (enrollment) =>
        String(enrollment.courseId) === String(courseId)
    );
  };

  // Get enrollments for a student.
  const getEnrollmentsByStudent = (studentIdentifier) => {
    const searchIdentifier = normalizeIdentifier(
      studentIdentifier
    );

    if (!searchIdentifier) return [];

    return enrollments.filter(
      (enrollment) =>
        normalizeIdentifier(enrollment.studentEmail) ===
          searchIdentifier ||
        normalizeIdentifier(enrollment.studentId) ===
          searchIdentifier
    );
  };

  // Count unique students.
  const uniqueStudents = new Set(
    enrollments
      .filter(
        (enrollment) =>
          enrollment.courseId !== undefined &&
          enrollment.courseId !== null
      )
      .map((enrollment) => {
        return (
          normalizeIdentifier(enrollment.studentEmail) ||
          normalizeIdentifier(enrollment.studentId)
        );
      })
      .filter(Boolean)
  );

  const totalStudents = uniqueStudents.size;

  // Count valid enrollment records.
  const totalEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.courseId !== undefined &&
      enrollment.courseId !== null &&
      (
        normalizeIdentifier(enrollment.studentEmail) ||
        normalizeIdentifier(enrollment.studentId)
      )
  ).length;

  const value = {
    enrollments,
    totalStudents,
    totalEnrollments,
    addEnrollment,
    removeEnrollment,
    updateEnrollment,
    getEnrollmentsByCourse,
    getEnrollmentsByStudent,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);

  if (!context) {
    throw new Error(
      'useEnrollment must be used inside EnrollmentProvider'
    );
  }

  return context;
}

export default EnrollmentContext;

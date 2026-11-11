
import { useCourses as useCourseContext } from '../context/CourseContext';

function useCourses() {
  const courseContext = useCourseContext();

  return courseContext;
}

export default useCourses;

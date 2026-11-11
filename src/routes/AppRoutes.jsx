
import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  GraduationCap,
  BookOpen,
  Sparkles,
} from 'lucide-react';

import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

import Dashboard from '../pages/student/Dashboard';
import CourseCatalogue from '../pages/student/CourseCatalogue';
import CourseDetails from '../pages/student/CourseDetails';
import Lessons from '../pages/student/Lessons';
import LessonViewer from '../pages/student/LessonViewer';
import Quiz from '../pages/student/Quiz';
import StudentProfile from '../pages/student/StudentProfile';
import Settings from '../pages/student/Settings';
import Certificates from '../pages/student/Certificates';
import Notifications from '../pages/student/Notifications';
import Wishlist from '../pages/student/Wishlist';
import MyCourses from '../pages/student/MyCourses';

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageCourses from '../pages/admin/ManageCourses';
import AddCourse from '../pages/admin/AddCourse';
import EditCourse from '../pages/admin/EditCourse';
import CoursePreview from '../pages/admin/CoursePreview';

import NotFound from '../pages/NotFound';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main className="page-container">
        <section className="welcome-screen">

          <div className="welcome-icon">
            <GraduationCap size={48} />
          </div>

          <p className="welcome-label">
            <Sparkles size={16} />
            YOUR LEARNING JOURNEY STARTS HERE
          </p>

          <h1>
            Welcome to <span>EduVerse</span>
          </h1>

          <h2>Your Universe of Learning</h2>

          <p className="welcome-description">
            Discover new skills, explore exciting courses,
            learn from expert instructors and achieve your
            learning goals with EduVerse.
          </p>

          <div className="welcome-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              <BookOpen size={18} />
              Explore Learning
            </button>
          </div>

          <p className="welcome-footer">
            Learn • Grow • Achieve
          </p>

        </section>
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>

      {/* 1. WELCOME PAGE */}
      <Route path="/" element={<Welcome />} />

      {/* 2. STUDENT APPLICATION */}
      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/courses"
          element={<CourseCatalogue />}
        />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/lessons"
          element={<Lessons />}
        />

        <Route
          path="/lessons/:courseId"
          element={<Lessons />}
        />

        <Route
          path="/lesson-viewer/:courseId/:lessonId"
          element={<LessonViewer />}
        />

        <Route
          path="/quizzes"
          element={<Quiz />}
        />

        <Route
          path="/quizzes/:courseId"
          element={<Quiz />}
        />

        <Route
          path="/profile"
          element={<StudentProfile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/certificates"
          element={<Certificates />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/my-courses"
          element={<MyCourses />}
        />

      </Route>

      {/* 3. ADMIN APPLICATION */}
      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="courses"
          element={<ManageCourses />}
        />

        <Route
          path="courses/add"
          element={<AddCourse />}
        />

        <Route
          path="courses/edit/:courseId"
          element={<EditCourse />}
        />

        <Route
          path="courses/preview/:courseId"
          element={<CoursePreview />}
        />

      </Route>

      {/* 4. NOT FOUND PAGE */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;


import {
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  PlayCircle,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useLearning } from '../../context/LearningContext';
import { useProfile } from '../../context/ProfileContext';

function Dashboard() {
  const { courses = [] } = useCourses();
  const { enrollments = [] } = useEnrollment();

  // Get learning time from LearningContext.
  const { totalLearningSeconds = 0 } = useLearning();

  const { profile } = useProfile();

  const studentName = profile?.name?.trim() || 'Student';

  const studentEmail = (
    profile?.email || 'student@eduverse.com'
  ).trim().toLowerCase();

  // Current student's enrollments.
  const studentEnrollments = enrollments.filter(
    (enrollment) =>
      String(enrollment.studentEmail || '')
        .trim()
        .toLowerCase() === studentEmail
  );

  // Match enrollments with courses.
  const enrolledCourses = studentEnrollments
    .map((enrollment) => {
      const course = courses.find(
        (item) =>
          String(item.id) === String(enrollment.courseId)
      );

      if (!course) return null;

      return {
        ...course,
        enrollmentId: enrollment.id,
        progress: Math.min(
          100,
          Math.max(0, Number(enrollment.progress) || 0)
        ),
        enrolledAt: enrollment.enrolledAt,
        status: enrollment.status,
        certificateIssued:
          enrollment.certificateIssued === true ||
          enrollment.certificate?.certificateIssued === true ||
          enrollment.certificate?.status === 'Issued',
      };
    })
    .filter(Boolean);

  // 1. Total enrolled courses.
  const totalEnrolled = enrolledCourses.length;

  // 2. Completed courses.
  const completedCourses = enrolledCourses.filter(
    (course) =>
      course.progress >= 100 ||
      course.status === 'Completed'
  ).length;

  // 3. Issued certificates.
  const totalCertificates = enrolledCourses.filter(
    (course) => course.certificateIssued
  ).length;

  // 4. Learning hours.
  // Every 60 seconds counts as 1 displayed hour.
  const learningHours = Math.floor(
    totalLearningSeconds / 60
  );

  const formattedLearningTime = `${learningHours} Hours`;

  // Continue unfinished courses.
  const continueCourses = enrolledCourses
    .filter((course) => course.progress < 100)
    .slice(0, 2);

  // Courses not yet enrolled in.
  const enrolledCourseIds = new Set(
    studentEnrollments.map(
      (enrollment) => String(enrollment.courseId)
    )
  );

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourseIds.has(String(course.id))
  );

  const recentCourses = availableCourses.slice(0, 3);

  const recommendedCourses = availableCourses.slice(3, 6);

  // Recent enrollment activity.
  const activities = [...enrolledCourses]
    .sort(
      (a, b) =>
        new Date(b.enrolledAt || 0) -
        new Date(a.enrolledAt || 0)
    )
    .slice(0, 3)
    .map((course) => ({
      title: 'Enrolled in a course',
      description: course.title,
      icon: PlayCircle,
    }));

  const stats = [
    {
      title: 'Enrolled Courses',
      value: String(totalEnrolled).padStart(2, '0'),
      icon: BookOpen,
    },
    {
      title: 'Completed Courses',
      value: String(completedCourses).padStart(2, '0'),
      icon: GraduationCap,
    },
    {
      title: 'Certificates',
      value: String(totalCertificates).padStart(2, '0'),
      icon: Award,
    },
    {
      title: 'Learning Hours',
      value: formattedLearningTime,
      icon: Clock,
    },
  ];

  return (
    <div className="dashboard-page">

      {/* 1. Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-banner-content">
          <span>YOUR LEARNING JOURNEY</span>

          <h1>Welcome back, {studentName}!</h1>

          <p>
            Keep learning, explore new skills and make progress
            towards your goals. Every lesson takes you one step
            closer to success.
          </p>
        </div>

        <div className="welcome-banner-image">
          <GraduationCap />
        </div>
      </section>

      {/* 2. Learning Statistics */}
      <section className="dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-card-top">
                <div className="stat-card-icon">
                  <Icon />
                </div>
              </div>

              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          );
        })}
      </section>

      {/* 3. Continue Learning and Activity */}
      <div className="dashboard-main-grid">

        <section className="dashboard-card">
          <div className="dashboard-section-heading">
            <div>
              <h2>Continue Learning</h2>
              <p>Pick up where you left off.</p>
            </div>
          </div>

          <div className="continue-learning-list">
            {continueCourses.length > 0 ? (
              continueCourses.map((course) => (
                <div
                  className="continue-learning-item"
                  key={course.enrollmentId}
                >
                  <div className="continue-learning-image">
                    <img
                      src={course.image}
                      alt={course.title}
                    />
                  </div>

                  <div className="continue-learning-info">
                    <h4>{course.title}</h4>

                    <p>
                      {typeof course.instructor === 'object'
                        ? course.instructor?.name || 'Instructor'
                        : course.instructor || 'Instructor'}
                    </p>

                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>

                    <div className="progress-details">
                      <span>Course progress</span>
                      <span>{course.progress}%</span>
                    </div>

                    <a href={`/courses/${course.id}`}>
                      Continue Course
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>
                No courses to continue. Enroll in a course
                and start learning!
              </p>
            )}
          </div>
        </section>

        {/* 4. Learning Activity */}
        <section className="dashboard-card">
          <h3>Learning Activity</h3>

          <div className="learning-activity">
            {activities.length > 0 ? (
              activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    className="learning-activity-item"
                    key={index}
                  >
                    <div className="learning-activity-icon">
                      <Icon size={19} />
                    </div>

                    <div className="learning-activity-info">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>
                Your learning activity will appear here.
              </p>
            )}
          </div>
        </section>

      </div>

      {/* 5. Recent Courses */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Recent Courses</h2>
            <p>Explore courses available in EduVerse.</p>
          </div>

          <a href="/courses">View All</a>
        </div>

        <div className="recent-courses-grid">
          {recentCourses.map((course) => (
            <article
              className="recent-course-card"
              key={course.id}
            >
              <img
                src={course.image}
                alt={course.title}
              />

              <div className="recent-course-content">
                <h4>{course.title}</h4>
                <p>{course.category}</p>

                <a href={`/courses/${course.id}`}>
                  View Course
                </a>
              </div>
            </article>
          ))}

          {recentCourses.length === 0 && (
            <p>No new courses available right now.</p>
          )}
        </div>
      </section>

      {/* 6. Recommended Courses */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Recommended Courses</h2>
            <p>Discover something new to learn.</p>
          </div>

          <a href="/courses">Explore All</a>
        </div>

        <div className="recommended-courses-grid">
          {recommendedCourses.map((course) => (
            <article
              className="recommended-course-card"
              key={course.id}
            >
              <img
                src={course.image}
                alt={course.title}
              />

              <div className="recommended-course-content">
                <h4>{course.title}</h4>
                <p>{course.category}</p>
              </div>
            </article>
          ))}

          {recommendedCourses.length === 0 && (
            <p>No additional recommendations available.</p>
          )}
        </div>
      </section>

      {/* 7. Upcoming Quizzes */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Upcoming Quizzes</h2>
            <p>Prepare yourself for your next assessment.</p>
          </div>
        </div>

        <div className="dashboard-card">
          <p>
            Upcoming quiz schedules will appear here when
            assessment scheduling is connected.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;

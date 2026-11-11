
import { useEffect, useMemo, useState } from 'react';

import {
  Award,
  Download,
  Eye,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react';

import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useProfile } from '../../context/ProfileContext';

import { addNotification } from '../../data/notifications';
import Toast from '../../components/common/Toast';

function formatCompletionDate(date) {
  if (!date) return 'Date unavailable';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date);
  }

  return parsedDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function Certificates() {
  const { courses = [] } = useCourses();
  const { enrollments = [] } = useEnrollment();
  const { profile } = useProfile();

  const studentName = profile?.name?.trim() || 'Student';
  const studentEmail =
    profile?.email?.trim().toLowerCase() || 'student@eduverse.com';

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [toast]);

  // Find completed courses and certificates for the current student.
  const completedCourses = useMemo(() => {
    return enrollments
      .filter((enrollment) => {
        const enrollmentEmail =
          enrollment.studentEmail?.trim().toLowerCase();

        const belongsToStudent =
          enrollmentEmail === studentEmail;

        const isCompleted =
          Number(enrollment.progress) >= 100 ||
          enrollment.status === 'Completed';

        const hasCertificate =
          enrollment.certificateIssued === true ||
          enrollment.certificate?.certificateIssued === true;

        return (
          belongsToStudent &&
          isCompleted &&
          hasCertificate
        );
      })
      .map((enrollment) => {
        const course = courses.find(
          (item) =>
            String(item.id) === String(enrollment.courseId)
        );

        if (!course) return null;

        const certificate = enrollment.certificate || {};

        return {
          ...course,
          enrollmentId: enrollment.id,
          recipientName: studentName,
          certificateCourseTitle:
            certificate.courseTitle ||
            course.title ||
            course.name ||
            'EduVerse Course',
          completionDate: formatCompletionDate(
            certificate.completionDate ||
            enrollment.completedAt
          ),
          certificateId:
            certificate.certificateId ||
            certificate.id ||
            '',
        };
      })
      .filter(Boolean);
  }, [enrollments, courses, studentEmail, studentName]);

  const escapeHTML = (value) => {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };

      return entities[character];
    });
  };

  // Download certificate through the browser print window.
  const handleDownload = (course) => {
    const certificateWindow = window.open('', '_blank');

    if (!certificateWindow) {
      alert('Please allow pop-ups to download your certificate.');
      return;
    }

    const recipientName = escapeHTML(studentName);
    const courseName = escapeHTML(
      course.certificateCourseTitle
    );
    const completionDate = escapeHTML(
      course.completionDate
    );

    certificateWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>EduVerse Certificate</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 35px;
              background: #F7F4EA;
              font-family: Arial, sans-serif;
              color: #1F362D;
            }

            .certificate {
              max-width: 850px;
              min-height: 500px;
              margin: 20px auto;
              padding: 45px;
              border: 10px double #97A589;
              background: #F7F4EA;
              text-align: center;
            }

            .brand {
              font-size: 18px;
              font-weight: bold;
              letter-spacing: 4px;
            }

            h1 {
              margin: 35px 0 15px;
              font-size: 38px;
              letter-spacing: 3px;
            }

            .subtitle {
              font-size: 17px;
            }

            .student {
              display: inline-block;
              min-width: 280px;
              margin: 30px 0;
              padding-bottom: 12px;
              border-bottom: 2px solid #97A589;
              font-size: 30px;
              font-weight: bold;
            }

            .course {
              margin: 20px 0;
              font-size: 22px;
              font-weight: bold;
            }

            .footer {
              display: flex;
              justify-content: space-between;
              gap: 20px;
              margin-top: 55px;
              font-size: 13px;
              text-align: left;
            }

            button {
              display: block;
              margin: 20px auto;
              padding: 12px 24px;
              border: none;
              background: #1F362D;
              color: #F7F4EA;
              cursor: pointer;
              font-size: 15px;
            }

            @media print {
              @page {
                size: landscape;
                margin: 10mm;
              }

              body {
                padding: 0;
                background: white;
              }

              .certificate {
                width: 100%;
                max-width: none;
                min-height: 180mm;
                margin: 0;
                break-inside: avoid;
              }

              button {
                display: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="certificate">
            <div class="brand">EDUVERSE</div>

            <h1>CERTIFICATE</h1>

            <p class="subtitle">
              This certificate is proudly presented to
            </p>

            <div class="student">${recipientName}</div>

            <p>For successfully completing the course</p>

            <div class="course">${courseName}</div>

            <p>
              Your dedication and commitment to learning are appreciated.
            </p>

            <div class="footer">
              <div>
                <strong>EduVerse</strong>
                <p>Learning Achievement</p>
              </div>

              <div>
                <strong>Completion Date</strong>
                <p>${completionDate}</p>
              </div>
            </div>
          </div>

          <button onclick="window.print()">
            Print / Save as PDF
          </button>
        </body>
      </html>
    `);

    certificateWindow.document.close();

    addNotification({
      title: 'Certificate Ready!',
      message: `${studentName}'s certificate for ${course.certificateCourseTitle} is ready to print or save as PDF.`,
      type: 'certificate',
    });

    setToast({
      message: 'Certificate is ready to print or save!',
      type: 'success',
    });
  };

  // Certificate preview styles.
  const previewStyles = {
    certificate: {
      width: '100%',
      maxWidth: '850px',
      minHeight: '500px',
      margin: '25px auto',
      padding: '45px',
      border: '10px double #97A589',
      background: '#F7F4EA',
      color: '#1F362D',
      textAlign: 'center',
      boxSizing: 'border-box',
    },

    brand: {
      fontSize: '18px',
      fontWeight: 'bold',
      letterSpacing: '4px',
    },

    heading: {
      margin: '35px 0 15px',
      fontSize: '38px',
      letterSpacing: '3px',
    },

    subtitle: {
      fontSize: '17px',
    },

    student: {
      display: 'inline-block',
      minWidth: '280px',
      margin: '30px 0',
      paddingBottom: '12px',
      borderBottom: '2px solid #97A589',
      fontSize: '30px',
      fontWeight: 'bold',
    },

    course: {
      margin: '20px 0',
      fontSize: '22px',
      fontWeight: 'bold',
    },

    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
      marginTop: '55px',
      fontSize: '13px',
      textAlign: 'left',
    },
  };

  // In-app certificate preview.
  if (selectedCertificate) {
    return (
      <div className="certificates-page">
        <div className="certificates-header">
          <div>
            <span className="certificates-eyebrow">
              YOUR ACHIEVEMENTS
            </span>

            <h1>Certificate Preview</h1>

            <p>
              View your course completion certificate.
            </p>
          </div>
        </div>

        <div className="certificate-preview-actions">
          <button
            type="button"
            onClick={() => setSelectedCertificate(null)}
          >
            <ArrowLeft size={17} />
            Back to Certificates
          </button>

          <button
            type="button"
            onClick={() => handleDownload(selectedCertificate)}
          >
            <Download size={17} />
            Download Certificate
          </button>
        </div>

        <div style={previewStyles.certificate}>
          <div style={previewStyles.brand}>EDUVERSE</div>

          <h1 style={previewStyles.heading}>
            CERTIFICATE
          </h1>

          <p style={previewStyles.subtitle}>
            This certificate is proudly presented to
          </p>

          <div style={previewStyles.student}>
            {studentName}
          </div>

          <p>For successfully completing the course</p>

          <div style={previewStyles.course}>
            {selectedCertificate.certificateCourseTitle}
          </div>

          <p>
            Your dedication and commitment to learning are appreciated.
          </p>

          <div style={previewStyles.footer}>
            <div>
              <strong>EduVerse</strong>
              <p>Learning Achievement</p>
            </div>

            <div>
              <strong>Completion Date</strong>
              <p>{selectedCertificate.completionDate}</p>
            </div>
          </div>
        </div>

        <Toast
          message={toast?.message}
          type={toast?.type || 'success'}
          onClose={() => setToast(null)}
        />
      </div>
    );
  }

  return (
    <div className="certificates-page">
      <div className="certificates-header">
        <div>
          <span className="certificates-eyebrow">
            YOUR ACHIEVEMENTS
          </span>

          <h1>My Certificates</h1>

          <p>
            Celebrate your learning achievements and completed courses.
          </p>
        </div>

        <div className="certificates-header-icon">
          <Award size={32} />
        </div>
      </div>

      <div className="certificates-summary">
        <div>
          <Award size={25} />

          <div>
            <h2>{completedCourses.length}</h2>
            <p>Certificates Earned</p>
          </div>
        </div>
      </div>

      {completedCourses.length === 0 ? (
        <div className="certificates-empty">
          <GraduationCap size={55} />

          <h2>No Certificates Yet</h2>

          <p>
            Complete all lessons in a course to earn your first
            EduVerse certificate.
          </p>
        </div>
      ) : (
        <div className="certificates-grid">
          {completedCourses.map((course) => (
            <div
              className="certificate-card"
              key={course.enrollmentId}
            >
              <div className="certificate-card-icon">
                <Award size={35} />
              </div>

              <div className="certificate-card-content">
                <span>COURSE COMPLETED</span>

                <h3>{course.certificateCourseTitle}</h3>

                <p>
                  Certificate awarded to {studentName}
                </p>

                <p>
                  Completion Date: {course.completionDate}
                </p>

                <div className="certificate-card-actions">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCertificate(course)
                    }
                  >
                    <Eye size={16} />
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(course)}
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast
        message={toast?.message}
        type={toast?.type || 'success'}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default Certificates;

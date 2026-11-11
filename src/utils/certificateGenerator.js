
 // Generate a unique certificate ID
export const generateCertificateId = () => {
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  const timePart = Date.now().toString(36).toUpperCase();

  return `EV-${timePart}-${randomPart}`;
};

// Format certificate issue date
export const formatCertificateDate = (date = new Date()) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

// Generate certificate information
export const generateCertificate = ({
  studentName,
  courseTitle,
  completionDate = new Date(),
  certificateId = generateCertificateId()
}) => {
  if (!studentName || !courseTitle) {
    throw new Error(
      'Student name and course title are required to generate a certificate.'
    );
  }

  return {
    certificateId,
    studentName: studentName.trim(),
    courseTitle: courseTitle.trim(),
    completionDate: formatCertificateDate(completionDate),
    issuedBy: 'EduVerse',
    status: 'Issued'
  };
};

// Check whether a student is eligible for a certificate
export const isCertificateEligible = (progress) => {
  return Number(progress) >= 100;
};

export default generateCertificate;

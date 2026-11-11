
const courseLessonTopics = [
  {
    courseId: 1,
    courseTitle: 'Web Development',
    lessons: [
      'Introduction to Web Development',
      'Understanding HTML Structure',
      'HTML Elements and Forms',
      'CSS Fundamentals and Selectors',
      'CSS Flexbox and Grid Layout',
      'JavaScript Fundamentals',
      'DOM Manipulation and Events',
      'Build and Deploy Your First Website',
    ],
  },
  {
    courseId: 2,
    courseTitle: 'Python',
    lessons: [
      'Introduction to Python Programming',
      'Variables and Data Types',
      'Operators and Expressions',
      'Conditional Statements',
      'Loops and Iterations',
      'Functions and Modules',
      'Lists, Tuples and Dictionaries',
      'Build a Python Mini Project',
    ],
  },
  {
    courseId: 3,
    courseTitle: 'Java',
    lessons: [
      'Introduction to Java Programming',
      'Java Syntax and Data Types',
      'Operators and Control Statements',
      'Classes and Objects',
      'Inheritance and Polymorphism',
      'Abstraction and Encapsulation',
      'Exception Handling and Collections',
      'Build a Java Application',
    ],
  },
  {
    courseId: 4,
    courseTitle: 'UI/UX Design',
    lessons: [
      'Introduction to UI/UX Design',
      'Understanding User Research',
      'User Personas and User Journeys',
      'Wireframing Fundamentals',
      'Design Principles and Typography',
      'Color Theory and Visual Design',
      'Prototyping with Figma',
      'Create a Complete UI/UX Project',
    ],
  },
  {
    courseId: 5,
    courseTitle: 'Data Science',
    lessons: [
      'Introduction to Data Science',
      'Understanding Data Types',
      'Python for Data Analysis',
      'NumPy Fundamentals',
      'Pandas and DataFrames',
      'Data Cleaning and Preparation',
      'Data Visualization',
      'Build a Data Analysis Project',
    ],
  },
  {
    courseId: 6,
    courseTitle: 'React',
    lessons: [
      'Introduction to React',
      'Setting Up a React Project',
      'JSX and React Components',
      'Props and Component Communication',
      'State and Event Handling',
      'React Hooks and useEffect',
      'React Router and Navigation',
      'Build a Complete React Application',
    ],
  },
  {
    courseId: 7,
    courseTitle: 'JavaScript',
    lessons: [
      'Introduction to JavaScript',
      'Variables and Data Types',
      'Operators and Expressions',
      'Functions and Scope',
      'Arrays and Array Methods',
      'Objects and Object Methods',
      'DOM Manipulation and Events',
      'Asynchronous JavaScript and APIs',
    ],
  },
  {
    courseId: 8,
    courseTitle: 'Digital Marketing',
    lessons: [
      'Introduction to Digital Marketing',
      'Understanding Digital Marketing Channels',
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Content Marketing Strategies',
      'Email Marketing Fundamentals',
      'Google Analytics and Performance',
      'Create a Digital Marketing Campaign',
    ],
  },
  {
    courseId: 9,
    courseTitle: 'Graphic Design',
    lessons: [
      'Introduction to Graphic Design',
      'Design Principles and Composition',
      'Typography and Font Pairing',
      'Color Theory and Applications',
      'Working with Shapes and Layouts',
      'Logo and Brand Identity Design',
      'Image Editing and Design Tools',
      'Create a Professional Design Portfolio',
    ],
  },
  {
    courseId: 10,
    courseTitle: 'Machine Learning',
    lessons: [
      'Introduction to Machine Learning',
      'Types of Machine Learning',
      'Python Libraries for Machine Learning',
      'Data Preparation and Feature Engineering',
      'Linear and Logistic Regression',
      'Classification and Clustering',
      'Model Training and Evaluation',
      'Build a Machine Learning Project',
    ],
  },
  {
    courseId: 11,
    courseTitle: 'Cloud Computing',
    lessons: [
      'Introduction to Cloud Computing',
      'Cloud Service Models',
      'Cloud Deployment Models',
      'Understanding Cloud Infrastructure',
      'Virtual Machines and Storage',
      'Cloud Networking Fundamentals',
      'Cloud Security and Monitoring',
      'Deploy an Application to the Cloud',
    ],
  },
  {
    courseId: 12,
    courseTitle: 'Cybersecurity',
    lessons: [
      'Introduction to Cybersecurity',
      'Understanding Security Fundamentals',
      'Common Cyber Threats and Attacks',
      'Network Security Fundamentals',
      'Cryptography and Encryption Basics',
      'Authentication and Access Control',
      'Web Application Security',
      'Cybersecurity Best Practices',
    ],
  },
];

// Generate individual learning materials for each topic.
const createLessonMaterials = (courseTitle, title) => {
  const topic = title;
  const course = courseTitle;

  return {
    description: `This lesson covers ${topic} in the ${course} course. Explore its important concepts, understand how they work, and practise applying them through activities.`,

    objectives: [
      `Understand the meaning and purpose of ${topic}.`,
      `Identify the important concepts and techniques used in ${topic}.`,
      `Explore practical examples related to ${topic}.`,
      `Apply the concepts of ${topic} through hands-on exercises.`,
    ],

    studyNotes: [
      {
        heading: 'Introduction',
        content: `${topic} is an important topic in ${course}. Begin by understanding its purpose, basic terminology, and how it fits into the wider subject.`,
      },
      {
        heading: 'Key Concepts',
        content: `Focus on the main principles of ${topic}. Learn the terminology, understand the steps involved, and study how its different concepts work together.`,
      },
      {
        heading: 'Practical Understanding',
        content: `Connect ${topic} with real-world applications. Study examples, follow practical demonstrations, and observe how the concepts are used to solve problems.`,
      },
      {
        heading: 'Lesson Summary',
        content: `Review the fundamentals of ${topic}, remember its important concepts, and practise explaining how they are applied in the ${course} field.`,
      },
    ],

    practiceMaterials: [
      {
        title: 'Concept Understanding',
        question: `Explain ${topic} in your own words and describe why it is important in ${course}.`,
        type: 'Theory',
      },
      {
        title: 'Knowledge Check',
        question: `List and explain four important concepts or techniques related to ${topic}.`,
        type: 'Short Answer',
      },
      {
        title: 'Practical Exercise',
        question: `Create a small practical example demonstrating how ${topic} is used.`,
        type: 'Practical',
      },
      {
        title: 'Challenge Activity',
        question: `Identify a real-world problem where ${topic} could be useful. Explain your approach to solving it.`,
        type: 'Challenge',
      },
    ],
  };
};

const lessons = courseLessonTopics.flatMap((course) =>
  course.lessons.map((title, index) => {
    const materials = createLessonMaterials(
      course.courseTitle,
      title
    );

    const videoSearchUrl =
      `https://www.youtube.com/results?search_query=${
        encodeURIComponent(`${course.courseTitle} ${title} tutorial`)
      }`;

    return {
      id: `${course.courseId}-${index + 1}`,
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      title,
      duration: `${20 + index * 5} min`,

      // Search for a video matching this exact lesson topic.
      videoUrl: '',
      videoSearchUrl,

      description: materials.description,
      objectives: materials.objectives,

      // Separate study notes for this topic.
      studyNotes: materials.studyNotes,

      // Separate exercises for this topic.
      practiceMaterials: materials.practiceMaterials,

      // Additional external resources can be added here.
      resources: [],
    };
  })
);

export default lessons;

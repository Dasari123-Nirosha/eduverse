
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Search,
  Menu,
  UserRound,
  ChevronDown,
} from 'lucide-react';

import NotificationBell from '../notifications/NotificationBell';
import NotificationList from '../notifications/NotificationList';

const pageTitles = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/courses': 'Course Catalogue',
  '/my-courses': 'My Courses',
  '/wishlist': 'My Wishlist',
  '/certificates': 'My Certificates',
  '/notifications': 'Notifications',
  '/profile': 'My Profile',
  '/settings': 'Settings',
  '/lessons': 'Lessons',
  '/quizzes': 'Quizzes',
  '/admin': 'Admin Dashboard',
  '/admin/courses': 'Course Management',
  '/admin/courses/add': 'Add Course',
};

const searchablePages = [
  {
    name: 'Dashboard',
    keywords: ['home', 'main page', 'student dashboard'],
    path: '/dashboard',
  },
  {
    name: 'Course Catalogue',
    keywords: ['courses', 'explore courses', 'all courses', 'catalogue'],
    path: '/courses',
  },
  {
    name: 'My Courses',
    keywords: ['enrolled courses', 'my learning', 'learning courses'],
    path: '/my-courses',
  },
  {
    name: 'Lessons',
    keywords: ['lesson', 'learning lessons', 'course lessons'],
    path: '/lessons',
  },
  {
    name: 'Quizzes',
    keywords: ['quiz', 'tests', 'exams', 'assessment'],
    path: '/quizzes',
  },
  {
    name: 'Wishlist',
    keywords: ['saved courses', 'favourites', 'favorites'],
    path: '/wishlist',
  },
  {
    name: 'Certificates',
    keywords: ['certificate', 'achievements', 'completed certificates'],
    path: '/certificates',
  },
  {
    name: 'Notifications',
    keywords: ['notification', 'alerts', 'messages'],
    path: '/notifications',
  },
  {
    name: 'Student Profile',
    keywords: ['profile', 'my account', 'student account'],
    path: '/profile',
  },
  {
    name: 'Settings',
    keywords: ['preferences', 'theme', 'appearance'],
    path: '/settings',
  },
  {
    name: 'Admin Dashboard',
    keywords: ['admin', 'administrator'],
    path: '/admin',
  },
  {
    name: 'Manage Courses',
    keywords: ['manage courses', 'course management'],
    path: '/admin/courses',
  },
  {
    name: 'Add Course',
    keywords: ['add course', 'create course', 'new course'],
    path: '/admin/courses/add',
  },
];

function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const currentTitle =
    pageTitles[location.pathname] || 'EduVerse';

  const handleSearch = (event) => {
    event.preventDefault();

    const search = searchValue.trim().toLowerCase();

    if (!search) {
      return;
    }

    setShowNotifications(false);

    // Find an exact page name or keyword
    const exactPage = searchablePages.find((page) => {
      return (
        page.name.toLowerCase() === search ||
        page.keywords.some(
          (keyword) => keyword.toLowerCase() === search
        )
      );
    });

    if (exactPage) {
      setSearchValue('');
      navigate(exactPage.path);
      return;
    }

    // Find a page using partial matching
    const matchingPage = searchablePages.find((page) => {
      const searchableNames = [
        page.name,
        ...page.keywords,
      ];

      return searchableNames.some((name) => {
        const normalizedName = name.toLowerCase();

        return (
          normalizedName.startsWith(search) ||
          search.startsWith(normalizedName)
        );
      });
    });

    if (matchingPage) {
      setSearchValue('');
      navigate(matchingPage.path);
      return;
    }

    // If no page matches, search courses
    navigate(
      `/courses?search=${encodeURIComponent(searchValue.trim())}`
    );

    setSearchValue('');
  };

  const handleNotifications = () => {
    setShowNotifications((previous) => !previous);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={23} />
        </button>

        <div className="topbar-heading">
          <h1>{currentTitle}</h1>
          <p>Welcome back! Continue your learning journey.</p>
        </div>
      </div>

      <div className="topbar-right">
        <form
          className="topbar-search"
          onSubmit={handleSearch}
        >
          <Search size={19} />

          <input
            type="search"
            placeholder="Search anything..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            aria-label="Search pages and courses"
          />
        </form>

        <div className="topbar-notification-wrapper">
          <NotificationBell onClick={handleNotifications} />

          {showNotifications && (
            <NotificationList onClose={closeNotifications} />
          )}
        </div>

        <button
          type="button"
          className="topbar-profile"
          onClick={() => navigate('/profile')}
          aria-label="Open student profile"
        >
          <div className="topbar-avatar">
            <UserRound size={21} />
          </div>

          <div className="topbar-user-info">
            <strong>Student</strong>
            <span>Learner</span>
          </div>

          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;

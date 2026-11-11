
import { NavLink } from 'react-router-dom';

import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Heart,
  Award,
  Bell,
  UserRound,
  Settings,
  ShieldCheck,
  X,
  ClipboardList,
  ClipboardCheck,
} from 'lucide-react';

const navigationGroups = [
  {
    title: 'LEARNING',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Course Catalogue', path: '/courses', icon: BookOpen },
      { name: 'Lessons', path: '/lessons', icon: ClipboardList },
      { name: 'Quizzes', path: '/quizzes', icon: ClipboardCheck },
      { name: 'My Courses', path: '/my-courses', icon: GraduationCap },
      { name: 'Wishlist', path: '/wishlist', icon: Heart },
      { name: 'Certificates', path: '/certificates', icon: Award },
    ],
  },
  {
    title: 'PERSONAL',
    items: [
      { name: 'Notifications', path: '/notifications', icon: Bell },
      { name: 'My Profile', path: '/profile', icon: UserRound },
      { name: 'Settings', path: '/settings', icon: Settings },
    ],
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { name: 'Course Management', path: '/admin/courses', icon: ShieldCheck },
    ],
  },
];

function Sidebar({ isOpen = true, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>

      {/* Sidebar Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <GraduationCap size={27} />
        </div>

        <div className="sidebar-brand-text">
          <h2>EduVerse</h2>
          <span>Your Universe of Learning</span>
        </div>

        {onClose && (
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        )}
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-navigation">

        {navigationGroups.map((group) => (
          <div className="sidebar-group" key={group.title}>

            <p className="sidebar-group-title">
              {group.title}
            </p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

          </div>
        ))}

      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <GraduationCap size={17} />
        <span>Learn • Grow • Achieve</span>
      </div>

    </aside>
  );
}

export default Sidebar;

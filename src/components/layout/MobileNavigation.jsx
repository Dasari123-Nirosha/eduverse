
import { NavLink } from 'react-router-dom';

import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  UserRound,
} from 'lucide-react';

const mobileLinks = [
  { name: 'Home', path: '/', icon: LayoutDashboard },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'My Learning', path: '/my-courses', icon: GraduationCap },
  { name: 'Profile', path: '/profile', icon: UserRound },
];

function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      {mobileLinks.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={21} />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MobileNavigation;

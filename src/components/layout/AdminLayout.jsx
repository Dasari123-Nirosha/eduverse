
import { Outlet, NavLink } from 'react-router-dom';

import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';

function AdminLayout() {
  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <GraduationCap size={30} />
          <div>
            <h2>EduVerse</h2>
            <span>Admin Workspace</span>
          </div>
        </div>

        <nav className="admin-navigation">

          <p className="admin-nav-title">ADMINISTRATION</p>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <BookOpen size={19} />
            Manage Courses
          </NavLink>

          <NavLink to="/" className="admin-nav-link admin-back-link">
            <ArrowLeft size={19} />
            Back to Learning
          </NavLink>

        </nav>

        <div className="admin-sidebar-footer">
          <GraduationCap size={17} />
          <span>EduVerse Administration</span>
        </div>

      </aside>

      <main className="admin-main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;


import { Link } from 'react-router-dom';
import { GraduationCap, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">

        <div className="footer-brand">
          <div className="footer-logo">
            <GraduationCap size={24} />
          </div>

          <div>
            <h3>EduVerse</h3>
            <p>Your Universe of Learning</p>
          </div>
        </div>

        <div className="footer-links">
          <Link to="/">Dashboard</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/my-courses">My Courses</Link>
          <Link to="/profile">Profile</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} EduVerse. All rights reserved.
        </p>

        <p className="footer-love">
          Made with <Heart size={15} /> for learners
        </p>
      </div>
    </footer>
  );
}

export default Footer;

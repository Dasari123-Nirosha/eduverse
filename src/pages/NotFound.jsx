
import { useNavigate } from 'react-router-dom';

import {
  BookOpen,
  Home,
  ArrowLeft,
  SearchX,
} from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">

      <div className="not-found-content">

        <div className="not-found-logo">
          <BookOpen size={30} />
          <span>EduVerse</span>
        </div>

        <div className="not-found-illustration">
          <SearchX size={72} />
        </div>

        <span className="not-found-code">
          404
        </span>

        <h1>Page Not Found</h1>

        <p>
          Oops! The page you are looking for doesn't exist,
          may have been moved, or is temporarily unavailable.
        </p>

        <div className="not-found-actions">

          <button
            type="button"
            className="not-found-home-button"
            onClick={() => navigate('/dashboard')}
          >
            <Home size={18} />
            Go to Dashboard
          </button>

          <button
            type="button"
            className="not-found-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        <div className="not-found-footer">
          Keep learning. Keep growing. Keep exploring.
        </div>

      </div>

    </div>
  );
}

export default NotFound;


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/layout.css';
import './App.css';
import './styles/courses.css';
import './styles/dashboard.css';
import './styles/lessons.css';
import './styles/quiz.css';
import './styles/profile.css';
import './styles/settings.css';
import './styles/certificates.css';
import './styles/notifications.css';
import './styles/wishlist.css';
import './styles/admin.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

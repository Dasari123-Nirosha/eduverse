
import { BrowserRouter } from 'react-router-dom';

import Toast from './components/common/Toast';

import AppRoutes from './routes/AppRoutes';

import { CourseProvider } from './context/CourseContext';
import { ProfileProvider } from './context/ProfileContext';
import { QuizProvider } from './context/QuizContext';
import { ThemeProvider } from './context/ThemeContext';

import { EnrollmentProvider } from './context/EnrollmentContext';
import { WishlistProvider } from './context/WishlistContext';
import { LearningProvider } from './context/LearningContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <ThemeProvider>
      <CourseProvider>
        <ProfileProvider>
          <QuizProvider>
            <NotificationProvider>
              <EnrollmentProvider>
                <LearningProvider>
                  <WishlistProvider>
                    <BrowserRouter>

                      <Toast global />

                      <AppRoutes />

                    </BrowserRouter>
                  </WishlistProvider>
                </LearningProvider>
              </EnrollmentProvider>
            </NotificationProvider>
          </QuizProvider>
        </ProfileProvider>
      </CourseProvider>
    </ThemeProvider>
  );
}

export default App;


import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { useProfile } from './ProfileContext';

const LearningContext = createContext();

const STORAGE_KEY = 'eduverse-learning-sessions';

function normalizeIdentifier(value) {
  return String(value || '').trim().toLowerCase();
}

function getSavedSessions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Unable to load learning sessions:', error);
    return [];
  }
}

function saveSessions(sessions) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );

    return true;
  } catch (error) {
    console.error('Unable to save learning sessions:', error);
    return false;
  }
}

export function LearningProvider({ children }) {
  const { profile } = useProfile();

  const [sessions, setSessions] = useState(getSavedSessions);
  const [activeSessionId, setActiveSessionId] = useState(null);

  const activeSession = useRef(null);

  const studentEmail = normalizeIdentifier(profile?.email);
  const studentName = profile?.name || 'Student';

  // 1. Persist the latest learning duration.
  const persistActiveSession = useCallback(() => {
    const session = activeSession.current;

    if (!session) return;

    const elapsedSeconds = Math.floor(
      (Date.now() - session.startedAt) / 1000
    );

    const additionalSeconds =
      elapsedSeconds - session.savedSeconds;

    if (additionalSeconds <= 0) return;

    const savedSessions = getSavedSessions();

    const existingIndex = savedSessions.findIndex(
      (item) => item.id === session.id
    );

    let updatedSessions;

    if (existingIndex >= 0) {
      updatedSessions = [...savedSessions];

      updatedSessions[existingIndex] = {
        ...updatedSessions[existingIndex],
        durationSeconds:
          (Number(updatedSessions[existingIndex].durationSeconds) || 0) +
          additionalSeconds,
      };
    } else {
      updatedSessions = [
        ...savedSessions,
        {
          id: session.id,
          courseId: session.courseId,
          lessonId: session.lessonId,
          studentEmail: session.studentEmail,
          studentName: session.studentName,
          durationSeconds: additionalSeconds,
          date: session.date,
        },
      ];
    }

    if (saveSessions(updatedSessions)) {
      session.savedSeconds = elapsedSeconds;
      setSessions(updatedSessions);
    }
  }, []);

  // 2. Automatically save learning time every 10 seconds.
  useEffect(() => {
    if (!activeSessionId) return;

    const interval = setInterval(() => {
      persistActiveSession();
    }, 10000);

    // Save when the browser tab is closed or refreshed.
    const handlePageHide = () => {
      persistActiveSession();
    };

    // Save when the user switches away from the tab.
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        persistActiveSession();
      }
    };

    window.addEventListener('pagehide', handlePageHide);

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        'pagehide',
        handlePageHide
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, [activeSessionId, persistActiveSession]);

  // 3. Stop and save the active learning session.
  const stopLearningSession = useCallback(() => {
    if (!activeSession.current) return;

    persistActiveSession();

    activeSession.current = null;
    setActiveSessionId(null);
  }, [persistActiveSession]);

  // 4. Start a new learning session.
  const startLearningSession = useCallback(
    (courseId, lessonId) => {
      if (!studentEmail) {
        console.warn(
          'A student email is required to track learning time.'
        );
        return;
      }

      // Avoid starting the same session more than once.
      if (
        activeSession.current &&
        String(activeSession.current.courseId) === String(courseId) &&
        String(activeSession.current.lessonId) === String(lessonId) &&
        activeSession.current.studentEmail === studentEmail
      ) {
        return;
      }

      // Save the previous session before starting another.
      stopLearningSession();

      const newSession = {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        courseId,
        lessonId,
        studentEmail,
        studentName,
        startedAt: Date.now(),
        savedSeconds: 0,
        date: new Date().toISOString(),
      };

      activeSession.current = newSession;

      // Save the new session immediately.
      const savedSessions = getSavedSessions();

      const updatedSessions = [
        ...savedSessions,
        {
          id: newSession.id,
          courseId,
          lessonId,
          studentEmail,
          studentName,
          durationSeconds: 0,
          date: newSession.date,
        },
      ];

      if (saveSessions(updatedSessions)) {
        setSessions(updatedSessions);
      }

      setActiveSessionId(newSession.id);
    },
    [
      studentEmail,
      studentName,
      stopLearningSession,
    ]
  );

  // 5. Get only the current student's learning sessions.
  const studentSessions = sessions.filter(
    (session) =>
      normalizeIdentifier(session.studentEmail) === studentEmail
  );

  // 6. Calculate total learning seconds.
  const totalLearningSeconds = studentSessions.reduce(
    (total, session) =>
      total + (Number(session.durationSeconds) || 0),
    0
  );

  // 7. Every 1 minute counts as 1 displayed hour.
  const totalLearningHours = Math.floor(
    totalLearningSeconds / 60
  );

  // 8. Synchronize changes from another browser tab.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return;
      }

      try {
        const savedData = JSON.parse(event.newValue);

        if (Array.isArray(savedData)) {
          setSessions(savedData);
        }
      } catch (error) {
        console.error(
          'Unable to sync learning sessions:',
          error
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(
        'storage',
        handleStorageChange
      );
    };
  }, []);

  const value = {
    sessions,
    studentSessions,
    totalLearningSeconds,
    totalLearningHours,
    startLearningSession,
    stopLearningSession,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);

  if (!context) {
    throw new Error(
      'useLearning must be used inside LearningProvider'
    );
  }

  return context;
}

export default LearningContext;

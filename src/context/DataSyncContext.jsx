
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../lib/supabase';

const DataSyncContext = createContext(null);

const SHARED_ROW_ID = 'eduverse-shared-demo';
const STORAGE_PREFIX = 'eduverse-';

function getLocalSnapshot() {
  const snapshot = {};

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      snapshot[key] = localStorage.getItem(key);
    }
  });

  return snapshot;
}

function hasRecoveredLaptopData(snapshot) {
  try {
    const courses = JSON.parse(
      snapshot['eduverse-courses'] || '[]'
    );

    const enrollments = JSON.parse(
      snapshot['eduverse-enrollments'] || '[]'
    );

    const profile = JSON.parse(
      snapshot['eduverse-student-profile'] || '{}'
    );

    return (
      Array.isArray(courses) &&
      courses.length > 0 &&
      Array.isArray(enrollments) &&
      enrollments.length > 0 &&
      profile.name &&
      profile.name !== 'Student'
    );
  } catch {
    return false;
  }
}

async function saveSnapshot(snapshot) {
  const { error } = await supabase
    .from('eduverse_data')
    .upsert(
      {
        id: SHARED_ROW_ID,
        data: snapshot,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

  if (error) {
    throw error;
  }
}

function restoreSnapshot(snapshot) {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });

  Object.entries(snapshot || {}).forEach(([key, value]) => {
    if (
      key.startsWith(STORAGE_PREFIX) &&
      typeof value === 'string'
    ) {
      localStorage.setItem(key, value);
    }
  });
}

function installStorageSync() {
  const originalSetItem = Storage.prototype.setItem;

  let syncTimer;

  Storage.prototype.setItem = function (key, value) {
    originalSetItem.call(this, key, value);

    if (
      this !== window.localStorage ||
      !key.startsWith(STORAGE_PREFIX)
    ) {
      return;
    }

    clearTimeout(syncTimer);

    syncTimer = setTimeout(async () => {
      try {
        const snapshot = getLocalSnapshot();
        await saveSnapshot(snapshot);
        console.log('EduVerse data synchronized.');
      } catch (error) {
        console.error(
          'EduVerse synchronization failed:',
          error
        );
      }
    }, 1000);
  };

  return () => {
    clearTimeout(syncTimer);
    Storage.prototype.setItem = originalSetItem;
  };
}

export function DataSyncProvider({ children }) {
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let removeStorageSync = null;

    const initializeSync = async () => {
      try {
        const { data, error } = await supabase
          .from('eduverse_data')
          .select('data')
          .eq('id', SHARED_ROW_ID)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (cancelled) return;

        if (data?.data) {
          restoreSnapshot(data.data);

          removeStorageSync = installStorageSync();

          setStatus('ready');
          return;
        }

        const localSnapshot = getLocalSnapshot();

        setCanUpload(
          hasRecoveredLaptopData(localSnapshot)
        );

        setStatus('needs-seed');
      } catch (error) {
        console.error('EduVerse sync initialization failed:', error);

        if (!cancelled) {
          setErrorMessage(error.message);
          setStatus('error');
        }
      }
    };

    initializeSync();

    return () => {
      cancelled = true;
      removeStorageSync?.();
    };
  }, []);

  const uploadLaptopData = async () => {
    try {
      setStatus('uploading');

      const snapshot = getLocalSnapshot();

      if (!hasRecoveredLaptopData(snapshot)) {
        throw new Error(
          'Recovered laptop data was not found. Upload cancelled.'
        );
      }

      await saveSnapshot(snapshot);

      installStorageSync();

      setStatus('ready');
    } catch (error) {
      console.error('Unable to upload EduVerse data:', error);
      setErrorMessage(error.message);
      setStatus('needs-seed');
    }
  };

  if (status === 'loading' || status === 'uploading') {
    return (
      <div style={screenStyle}>
        <h2>EduVerse</h2>
        <p>
          {status === 'uploading'
            ? 'Uploading your recovered data...'
            : 'Loading your shared learning data...'}
        </p>
      </div>
    );
  }

  if (status === 'needs-seed') {
    return (
      <div style={screenStyle}>
        <h2>EduVerse Shared Data</h2>

        {canUpload ? (
          <>
            <p>
              Recovered laptop data is available.
              Upload it to make it available on mobile.
            </p>

            <button
              type="button"
              onClick={uploadLaptopData}
              style={buttonStyle}
            >
              Upload Laptop Data to Supabase
            </button>
          </>
        ) : (
          <p>
            Shared data has not been initialized yet.
            Please initialize it from your laptop first.
          </p>
        )}

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={screenStyle}>
        <h2>EduVerse Sync Connection</h2>
        <p>Unable to connect to shared data.</p>
        <p>{errorMessage}</p>
        <p>Please check the Supabase connection and permissions.</p>
      </div>
    );
  }

  return (
    <DataSyncContext.Provider
      value={{ status }}
    >
      {children}
    </DataSyncContext.Provider>
  );
}

export function useDataSync() {
  const context = useContext(DataSyncContext);

  if (!context) {
    throw new Error(
      'useDataSync must be used inside DataSyncProvider'
    );
  }

  return context;
}

const screenStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: '#F7F4EA',
  color: '#1F362D',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
};

const buttonStyle = {
  padding: '13px 22px',
  border: 'none',
  borderRadius: '8px',
  background: '#1F362D',
  color: '#FFFFFF',
  fontSize: '15px',
  cursor: 'pointer',
};

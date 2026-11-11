
// Get data from LocalStorage
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return defaultValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error('Error reading LocalStorage:', error);
    return defaultValue;
  }
};

// Save data to LocalStorage
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to LocalStorage:', error);
    return false;
  }
};

// Remove a specific item from LocalStorage
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing LocalStorage item:', error);
    return false;
  }
};

// Clear all LocalStorage data
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing LocalStorage:', error);
    return false;
  }
};

/**
 * Theme utility functions for handling dark mode
 */

// Check if user prefers dark mode
export const getInitialTheme = (): 'light' | 'dark' => {
  // Check localStorage first
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  }

  // If no theme in localStorage, check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }

  // Default to light
  return 'light';
};

// Set theme in localStorage and apply to document
export const setTheme = (theme: 'light' | 'dark'): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('theme', theme);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
};

// Toggle between light and dark mode
export const toggleTheme = (): 'light' | 'dark' => {
  const currentTheme = getInitialTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

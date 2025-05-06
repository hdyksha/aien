import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getInitialTheme, setTheme, toggleTheme } from '../../src/utils/theme';

describe('Theme Utilities', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  // Mock document methods
  const documentMock = {
    documentElement: {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    },
  };

  // Mock matchMedia
  const matchMediaMock = vi.fn();

  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    Object.defineProperty(window, 'document', { value: documentMock });
    Object.defineProperty(window, 'matchMedia', { value: matchMediaMock });
    
    // Clear mocks
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getInitialTheme', () => {
    it('returns theme from localStorage if available', () => {
      localStorageMock.getItem.mockReturnValueOnce('dark');
      expect(getInitialTheme()).toBe('dark');
      
      localStorageMock.getItem.mockReturnValueOnce('light');
      expect(getInitialTheme()).toBe('light');
    });

    it('returns dark if system prefers dark mode and no localStorage value', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      matchMediaMock.mockReturnValueOnce({ matches: true });
      expect(getInitialTheme()).toBe('dark');
    });

    it('returns light as default if no preference is found', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      matchMediaMock.mockReturnValueOnce({ matches: false });
      expect(getInitialTheme()).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('sets theme in localStorage', () => {
      setTheme('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('updates document classes', () => {
      setTheme('dark');
      expect(documentMock.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(documentMock.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });
  });

  describe('toggleTheme', () => {
    it('toggles from light to dark', () => {
      localStorageMock.getItem.mockReturnValueOnce('light');
      expect(toggleTheme()).toBe('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('toggles from dark to light', () => {
      localStorageMock.getItem.mockReturnValueOnce('dark');
      expect(toggleTheme()).toBe('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });
  });
});

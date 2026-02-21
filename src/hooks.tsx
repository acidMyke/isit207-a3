import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
) {
  const getDefaultValue = () =>
    typeof defaultValue === 'function'
      ? (defaultValue as () => T)()
      : defaultValue;

  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
      return getDefaultValue();
    } catch {
      return getDefaultValue();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [state, setState] as const;
}

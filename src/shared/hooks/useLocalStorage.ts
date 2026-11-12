import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type Validator<T> = (value: unknown) => value is T;

const getStorageKey = (key: string) => `orbitspace:${key}`;

export function readLocalStorageItem(key: string) {
  const storageKey = getStorageKey(key);
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      return saved;
    }

    for (const legacyKey of [`orbitspace:guest:${key}`, key]) {
      const legacy = localStorage.getItem(legacyKey);
      if (legacy !== null) {
        localStorage.setItem(storageKey, legacy);
        localStorage.removeItem(legacyKey);
        return legacy;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function writeLocalStorageItem(key: string, value: string) {
  try {
    localStorage.setItem(getStorageKey(key), value);
  } catch {
    // Keep playback working when browser storage is unavailable.
  }
}

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function useLocalStorage<T>(
  key: string,
  fallback: T,
  validate: Validator<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = readLocalStorageItem(key);
      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);
        return validate(parsed) ? parsed : fallback;
      }
    } catch {
      return fallback;
    }

    return fallback;
  });

  useEffect(() => {
    try {
      localStorage.setItem(getStorageKey(key), JSON.stringify(value));
    } catch {
      // Keep the in-memory app usable when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}

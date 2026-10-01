import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useUser } from "@clerk/react";

type Validator<T> = (value: unknown) => value is T;

export const getUserStorageKey = (userId: string | undefined, key: string) =>
  `orbitspace:${userId ?? "guest"}:${key}`;

export function readUserStorageItem(userId: string | undefined, key: string) {
  const storageKey = getUserStorageKey(userId, key);
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      return saved;
    }

    if (userId) {
      const legacy = localStorage.getItem(key);
      if (legacy !== null) {
        localStorage.setItem(storageKey, legacy);
        localStorage.removeItem(key);
        return legacy;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function writeUserStorageItem(
  userId: string | undefined,
  key: string,
  value: string,
) {
  try {
    localStorage.setItem(getUserStorageKey(userId, key), value);
  } catch {
    // Keep playback working when browser storage is unavailable.
  }
}

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function useUserStorage<T>(
  key: string,
  fallback: T,
  validate: Validator<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const { user } = useUser();
  const userId = user?.id;
  const storageKey = getUserStorageKey(userId, key);
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);
        return validate(parsed) ? parsed : fallback;
      }

      if (userId) {
        const legacy = localStorage.getItem(key);
        if (legacy !== null) {
          const parsed: unknown = JSON.parse(legacy);
          if (validate(parsed)) {
            localStorage.setItem(storageKey, JSON.stringify(parsed));
            localStorage.removeItem(key);
            return parsed;
          }
        }
      }
    } catch {
      return fallback;
    }

    return fallback;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Keep the in-memory app usable when browser storage is unavailable.
    }
  }, [storageKey, value]);

  return [value, setValue];
}
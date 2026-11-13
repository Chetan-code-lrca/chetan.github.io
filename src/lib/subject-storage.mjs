const STORAGE_KEY = "studyflow.subjects.v1";

function getBrowserStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Load the subjects saved by this browser.
 * Invalid, unavailable, or outdated storage is treated as an empty list.
 * @param {{ getItem(key: string): string | null } | null} [storage]
 * @returns {string[]}
 */
export function loadSubjects(storage = getBrowserStorage()) {
  if (!storage) return [];

  try {
    const serialized = storage.getItem(STORAGE_KEY);
    if (!serialized) return [];

    const parsed = JSON.parse(serialized);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((subject) => typeof subject === "string" && subject.trim().length > 0)
      .map((subject) => subject.trim());
  } catch {
    return [];
  }
}

/**
 * Persist the current subjects in this browser.
 * @param {readonly string[]} subjects
 * @param {{ setItem(key: string, value: string): void } | null} [storage]
 * @returns {boolean} Whether the write succeeded.
 */
export function saveSubjects(subjects, storage = getBrowserStorage()) {
  if (!storage) return false;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    return true;
  } catch {
    return false;
  }
}

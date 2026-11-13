import assert from "node:assert/strict";
import { test } from "node:test";
import { loadSubjects, saveSubjects } from "../src/lib/subject-storage.mjs";

class MemoryStorage {
  #values = new Map();

  getItem(key) {
    return this.#values.get(key) ?? null;
  }

  setItem(key, value) {
    this.#values.set(key, value);
  }
}

test("subjects survive a save and reload", () => {
  const storage = new MemoryStorage();
  const subjects = ["Algorithms", "Database Systems"];

  assert.equal(saveSubjects(subjects, storage), true);
  assert.deepEqual(loadSubjects(storage), subjects);
});

test("missing or malformed stored data produces an empty list", () => {
  const storage = new MemoryStorage();

  assert.deepEqual(loadSubjects(storage), []);
  storage.setItem("studyflow.subjects.v1", "{not-json");
  assert.deepEqual(loadSubjects(storage), []);
  storage.setItem("studyflow.subjects.v1", JSON.stringify({ subject: "OS" }));
  assert.deepEqual(loadSubjects(storage), []);
});

test("loading ignores non-string and blank entries without losing valid subjects", () => {
  const storage = new MemoryStorage();
  storage.setItem(
    "studyflow.subjects.v1",
    JSON.stringify([" Algorithms ", "", null, 42, "Operating Systems"]),
  );

  assert.deepEqual(loadSubjects(storage), ["Algorithms", "Operating Systems"]);
});

test("storage read and write failures are handled without crashing the app", () => {
  const brokenStorage = {
    getItem() {
      throw new Error("storage blocked");
    },
    setItem() {
      throw new Error("quota exceeded");
    },
  };

  assert.deepEqual(loadSubjects(brokenStorage), []);
  assert.equal(saveSubjects(["Algorithms"], brokenStorage), false);
  assert.deepEqual(loadSubjects(null), []);
  assert.equal(saveSubjects(["Algorithms"], null), false);
});

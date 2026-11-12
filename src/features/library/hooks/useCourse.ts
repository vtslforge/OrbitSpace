import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import type { Course } from "../types";
import { isRecord, useLocalStorage } from "../../../shared/hooks/useLocalStorage";

function isCourseList(value: unknown): value is Course[] {
  return Array.isArray(value) && value.every((course) =>
    isRecord(course) &&
    typeof course.title === "string" &&
    typeof course.description === "string" &&
    typeof course.category === "string" &&
    typeof course.difficulty === "string" &&
    typeof course.url === "string" &&
    (course.id === undefined || typeof course.id === "string"),
  );
}

export function useCourse(
  setCurrentWatch?: Dispatch<SetStateAction<Course[]>>,
) {
  const [inputValue, setInputValue] = useState<Course>({
    title: "",
    description: "",
    category: "None",
    difficulty: "Beginner",
    url: "",
  });

  const [savedCourse, setSavedCourse] = useLocalStorage("savedCourse", [], isCourseList);

  function handleSave(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.category === "None") {
      return;
    }
    const newCourse: Course = {
      ...inputValue,
      id: crypto.randomUUID(),
    };
    setSavedCourse((prev) => [newCourse, ...prev]);
    setInputValue({
      title: "",
      description: "",
      category: "None",
      difficulty: "Beginner",
      url: "",
    });

    
  }

  function handleDelete(id: string) {
    setSavedCourse((prev) => prev.filter((course) => course.id !== id));
    setCurrentWatch?.((prev) =>
      prev.filter((course) => course.id !== id),
    );
  }

  return {
    inputValue,
    setInputValue,
    handleSave,
    handleDelete,
    savedCourse,
  };
}

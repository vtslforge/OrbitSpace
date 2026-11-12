import { type Dispatch, type SetStateAction } from "react";
import type { Course } from "../types";
import { useNavigate } from "react-router-dom";
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

export type LearningProgressOutletContext = {
  currentWatch: Course[];
  setCurrentWatch: Dispatch<SetStateAction<Course[]>>;
  handleCurrentNavAndValue: (course: Course) => void;
};

export function useLearningProgress(): LearningProgressOutletContext {
  // state to store the current watch library arrays
  const [currentWatch, setCurrentWatch] = useLocalStorage<Course[]>("currentWatch", [], isCourseList);

  // button to navigate to recent watching video and also to handle the store the state of current watch component in dashboard
  const navigate = useNavigate();
  function handleCurrentNavAndValue(course: Course) {
    const selectedCourse = [course];
    setCurrentWatch(selectedCourse);
    navigate(`/player/${encodeURIComponent(course.url)}`);
  }
  
  return {
    currentWatch,
    setCurrentWatch,
    handleCurrentNavAndValue,
  };
}

import { type Dispatch, type SetStateAction } from "react";
import type { InputType } from "./useCourse";
import { useNavigate } from "react-router-dom";
import { isRecord, useUserStorage } from "../../../shared/hooks/useUserStorage";

function isCourseList(value: unknown): value is InputType[] {
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

export type UseStatType = {
  currentWatch: InputType[];
  setCurrentWatch: Dispatch<SetStateAction<InputType[]>>;
  handleCurrentNavAndValue: (course: InputType) => void;
};

export function useStat(): UseStatType {
  // state to store the current watch library arrays
  const [currentWatch, setCurrentWatch] = useUserStorage<InputType[]>("currentWatch", [], isCourseList);

  // button to navigate to recent watching video and also to handle the store the state of current watch component in dashboard
  const navigate = useNavigate();
  function handleCurrentNavAndValue(course: InputType) {
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

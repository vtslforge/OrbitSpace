import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
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

export type Category =
  | "None"
  | "Programming"
  | "Life Skill"
  | "Design"
  | "Business"
  | "Custom";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type InputType = {
  id?: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  url: string;
};

export type UseCourseType = {
  inputValue: InputType;
  handleSave: (e: SubmitEvent<HTMLFormElement>) => void;
  handleDelete?: (id: string) => void;
  setInputValue: Dispatch<SetStateAction<InputType>>;
  savedCourse?: InputType[];
};

export function useCourse(
  setCurrentWatch?: Dispatch<SetStateAction<InputType[]>>,
) {
  const [inputValue, setInputValue] = useState<InputType>({
    title: "",
    description: "",
    category: "None",
    difficulty: "Beginner",
    url: "",
  });

  const [savedCourse, setSavedCourse] = useUserStorage("savedCourse", [], isCourseList);

  function handleSave(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.category === "None") {
      return;
    }
    const newCourse: InputType = {
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

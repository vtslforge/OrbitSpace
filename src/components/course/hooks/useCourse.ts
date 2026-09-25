import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";

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
  setCurrentWatch?: Dispatch<SetStateAction<InputType[] | undefined>>,
) {
  const [inputValue, setInputValue] = useState<InputType>({
    title: "",
    description: "",
    category: "None",
    difficulty: "Beginner",
    url: "",
  });

  const [savedCourse, setSavedCourse] = useState<InputType[]>(() => {
    const savedCourse = localStorage.getItem("savedCourse");
    if (!savedCourse) {
      return [];
    }

    try {
      return JSON.parse(savedCourse);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedCourse", JSON.stringify(savedCourse));
  }, [savedCourse]);

  function handleSave(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
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
      prev?.filter((course) => course.id !== id),
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

import type { Dispatch, SetStateAction, SubmitEvent } from "react";

export type CourseCategory =
  | "None"
  | "Programming"
  | "Life Skill"
  | "Design"
  | "Business"
  | "Custom";

export type CourseDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  id?: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  url: string;
};

export type CourseFormProps = {
  inputValue: Course;
  handleSave: (event: SubmitEvent<HTMLFormElement>) => void;
  setInputValue: Dispatch<SetStateAction<Course>>;
};

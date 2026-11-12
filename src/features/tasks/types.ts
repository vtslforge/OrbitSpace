import type { Dispatch, SetStateAction } from "react";
import type { useTaskCreation, useTaskFilter, useToggleForm } from "./hooks/useTasks";

export type Priority = "High" | "Normal" | "Low";

export type FilterValue = "All" | Priority;

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
};

export type ToggleFormProps = {
  formStatus?: boolean;
  toggleForm?: () => void;
};

export type TaskCreationState = {
  inputData: Task;
  setInputData: Dispatch<SetStateAction<Task>>;
  savedData: Task[];
  handleSave: (e: React.SubmitEvent<HTMLFormElement>) => void;
  handleDelete: (id: string) => void;
};

export type TasksOutletContext = ReturnType<typeof useToggleForm> &
  ReturnType<typeof useTaskCreation> &
  ReturnType<typeof useTaskFilter>;
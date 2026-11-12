import type {
  TaskCreationState,
  Task,
  ToggleFormProps,
  FilterValue,
} from "../types";

import { useState, type SubmitEvent } from "react";
import { isRecord, useLocalStorage } from "../../../shared/hooks/useLocalStorage";

function isTaskList(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every((task) =>
    isRecord(task) &&
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    ["High", "Normal", "Low"].includes(task.priority as string) &&
    typeof task.dueDate === "string",
  );
}

/*
 * -----------------------------------------------------------------------------------
 * Function to handle the toggle of the form UI
 * -----------------------------------------------------------------------------------
 */

export function useToggleForm(): Required<ToggleFormProps> {
  const [formStatus, setFormStatus] = useState(false);

  function toggleForm() {
    setFormStatus((prev) => !prev);
  }

  return {
    formStatus,
    toggleForm,
  };
}

/*
 * -----------------------------------------------------------------------------------
 * Function to handle task data and save it to savedData
 * -----------------------------------------------------------------------------------
 */

export function useTaskCreation(): TaskCreationState {
  const [inputData, setInputData] = useState<Task>({
    id: "",
    title: "",
    description: "",
    priority: "Normal",
    dueDate: "",
  });

  const [savedData, setSavedData] = useLocalStorage("savedData", [], isTaskList);

  // Handle task creation

  function handleSave(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTask: Task = {
      ...inputData,
      id: crypto.randomUUID(),
    };

    setSavedData((prev) => [newTask, ...prev]);

    // Reset form after saving

    setInputData({
      id: "",
      title: "",
      description: "",
      priority: "Normal",
      dueDate: "",
    });
  }

  // Handle task deletion
  function handleDelete(id: string) {
    setSavedData((prev) => prev.filter((task) => task.id !== id));
  }

  return {
    handleSave,
    inputData,
    setInputData,
    savedData,
    handleDelete,
  };
}

/*
 * -----------------------------------------------------------------------------------
 * Function to handle task filtering
 * -----------------------------------------------------------------------------------
 */

export function useTaskFilter(tasks: Task[]) {
  const filters: FilterValue[] = ["All", "High", "Normal", "Low"];
  const [filter, setFilter] = useState<FilterValue>("All");
  function handleFilter(filterValue: FilterValue) {
    setFilter(filterValue);
  }

  const filteredData = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    }

    return task.priority === filter;
  });

  return {
    filters,
    filter,
    handleFilter,
    filteredData,
  };
}

import { FilterUi } from "./components/FilterUi";
import TasksHeader from "./components/TasksHeader";
import TaskBoard from "./components/TaskBoard";
import { useOutletContext } from "react-router-dom";
import type { TasksOutletContext } from "./types";

const TasksPage = () => {
  const {
    toggleForm,
    formStatus,
    handleSave,
    inputData,
    setInputData,
    handleDelete,
    filter,
    handleFilter,
    filteredData,
    filters,
  } = useOutletContext<TasksOutletContext>();

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[1500px] px-[clamp(24px,4vw,58px)] pt-[34px] pb-[60px] max-[760px]:px-[18px] max-[760px]:pt-[23px] max-[760px]:pb-[34px]">
      <TasksHeader toggleForm={toggleForm} />
      <FilterUi filter={filter} handleFilter={handleFilter} filters={filters} />
      <TaskBoard
        handleDelete={handleDelete}
        formStatus={formStatus}
        handleSave={handleSave}
        inputData={inputData}
        setInputData={setInputData}
        filteredData={filteredData}
      />
    </div>
  );
};

export default TasksPage;

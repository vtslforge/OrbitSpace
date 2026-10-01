import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import {
  useTaskCreation,
  useTaskFilter,
  useToggleForm,
} from "../components/todo/handleTask";
import { useStat } from "../components/course/hooks/useLibrary";
import { useBookmark } from "../components/bookmarks/hooks/useBookmark";

const Layout = () => {
  const toggleFormState = useToggleForm();
  const taskCreationState = useTaskCreation();
  const taskFilterState = useTaskFilter(taskCreationState.savedData);
  const currentWatch = useStat();
  const bookmarksSavedFavourate = useBookmark();

  return (
    <div className="workspace-shell flex">
      <Sidebar />
      <main className="workspace-main">
        <Outlet
          context={{
            ...toggleFormState,
            ...taskCreationState,
            ...taskFilterState,
            ...currentWatch,
            ...bookmarksSavedFavourate
          }}
        />
      </main>
    </div>
  );
};

export default Layout;

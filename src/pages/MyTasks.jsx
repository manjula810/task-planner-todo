import { useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import useTasks from "../hooks/TaskHooks/useTasks";
import TaskList from "../components/tasks/TaskList";
import TaskFilter from "../components/tasks/TaskFilter";

export default function MyTasks() {
  const { handleEditTask } = useOutletContext();

  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useTasks();

  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredTasks = useMemo(() => {
    let result = [...tasks ?? []];

    if (activeFilter === "Pending") {
      result = result.filter((task) => task.status === "Pending");
    } else if (activeFilter === "Completed") {
      result = result.filter((task) => task.status === "Completed");
    } else if (activeFilter === "Overdue") {
      const now = new Date();

      const today =
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")}`;

      result = result.filter((task) => {
        const dueDate = task.dueDate
          ? String(task.dueDate).slice(0, 10)
          : "";

        return (
          task.status !== "Completed" &&
          dueDate !== "" &&
          dueDate < today
        );
      });
    }

    // priority sorting
    const priorityRank = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    if (sortOrder === "high-low") {
      result.sort(
        (a, b) => priorityRank[b.priority] - priorityRank[a.priority]
      );
    } else if (sortOrder === "low-high") {
      result.sort(
        (a, b) => priorityRank[a.priority] - priorityRank[b.priority]
      );
    }

    return result;
  }, [tasks, activeFilter, sortOrder]);


return (
  <div className="w-full min-w-0 overflow-x-auto scrollbar-hide text-text">
    <div className="min-w-155 lg:min-w-0 flex flex-col gap-section">

      <TaskFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {isPending ? (
        <p>Loading tasks...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEditTask={handleEditTask}
        />
      )}

    </div>
  </div>
);

}

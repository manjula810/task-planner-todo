import { useTasks } from "../hooks/useTask.js";
import TaskList from "../components/tasks/TaskList";
import { useOutletContext } from "react-router";

export default function Dashboard() {
  const { data: tasks, isPending, isError, error } = useTasks();

  const { handleEditTask } = useOutletContext();

  // Actual tasks fetched from the backend
  const taskList = tasks ?? [];

  // Get today's date in YYYY-MM-DD format
  const now = new Date();
  const today =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`;

  // Calculate dashboard counts
  const completedCount = taskList.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingCount = taskList.filter(
    (task) => task.status === "Pending",
  ).length;

  const overdueCount = taskList.filter((task) => {
    const dueDate = task.dueDate ? String(task.dueDate).slice(0, 10) : "";

    return task.status !== "Completed" && dueDate !== "" && dueDate < today;
  }).length;

  const stats = [
    {
      title: "Completed Tasks",
      count: completedCount,
      icon: "fa-circle-check",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Tasks",
      count: pendingCount,
      icon: "fa-clock",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Overdue Tasks",
      count: overdueCount,
      icon: "fa-triangle-exclamation",
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section className="flex flex-col gap-section">
      {/* Dashboard statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-card">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center justify-between gap-control rounded-xl border border-border bg-surface p-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-col gap-2">
              <p className="text-small text-text/70">{stat.title}</p>

              <p className="text-h1 font-bold text-text">
                {isPending || isError ? "—" : stat.count}
              </p>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
            >
              <i
                className={`fa-solid ${stat.icon} text-xl ${stat.iconColor}`}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      {isPending ? (
        <p>Loading tasks...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <TaskList tasks={taskList} onEditTask={handleEditTask} />
      )}
    </section>
  );
}

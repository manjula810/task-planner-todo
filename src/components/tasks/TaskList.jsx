import useDeleteTask from "../../hooks/TaskHooks/useDeleteTask";
import useUpdateTask from "../../hooks/TaskHooks/useUpdateTask";
export default function TaskList({ tasks = [], onEditTask }) {
  const deleteTask = useDeleteTask();
  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (confirmDelete) deleteTask.mutate(id);
  }

  const updateTask = useUpdateTask();

  function handleStatusChange(task) {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";

    updateTask.mutate({
      id: task._id,
      updatedTask: {
        status: newStatus,
      },
    });
  }
  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl bg-surface flex-1">
      <table className="w-full min-w-162.5 sm:min-w-0 text-left">
        <thead>
          <tr className="border-b-2 border-border text-text">
            <th className="px-4 py-4 font-semibold">Task</th>
            <th className="px-4 py-4 font-semibold">Priority</th>
            <th className="px-4 py-4 font-semibold">Due Date</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-4 py-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            return (
              <tr className="border-b border-border hover:bg-background">
                <td className="px-4 py-4 font-medium text-text">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      title="Mark task as completed"
                      checked={task.status === "Completed"}
                      onChange={() => handleStatusChange(task)}
                      className="h-4 w-4 cursor-pointer accent-pink-500"
                    />
                    <span
                      className={
                        task.status === "Completed"
                          ? "line-through opacity-60"
                          : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-text">
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => onEditTask(task)}
                      type="button"
                      title="Edit task"
                      className="text-text hover:text-primary-hover cursor-pointer"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      type="button"
                      title="Delete task"
                      className="text-text hover:text-red-600 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

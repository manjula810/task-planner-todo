
import { useState } from "react";

export default function Modal({ onClose, onSave ,task}) {
const [taskData, setTaskData] = useState({
  title: task?.title,
  description: task?.description,
  dueDate: task?.dueDate
    ? new Date(task.dueDate).toISOString().slice(0, 10)
    : "",
  priority: task?.priority || "Medium",
});
  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      ...taskData,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
    };

    if (!newTask.title) return;

    onSave(newTask);
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-surface shadow-2xl gap-control rounded-md flex flex-col text-text p-control"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal heading */}
        <div className="flex items-center gap-control">
          <span className="w-8 h-8 rounded-full bg-primary-hover flex items-center justify-center text-surface">
            <i className="fa-solid fa-plus font-bold"></i>
          </span>

          <p id="modal-title" className="text-body font-bold flex-1">
            Add New Task
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full border border-primary cursor-pointer flex items-center justify-center text-primary hover:bg-background"
          >
            <i className="fa-solid fa-xmark font-bold"></i>
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-semibold text-small">
            Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                title: e.target.value,
              })
            }
            placeholder="Enter title"
            required
            className="border-2 border-secondary rounded-sm p-2 outline-none focus:border-primary"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-semibold text-small">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                description: e.target.value,
              })
            }
            rows={3}
            placeholder="Enter task description"
            className="w-full resize-none border-2 border-secondary rounded-sm p-2 outline-none focus:border-primary"
          />
        </div>

        {/* Due date and priority */}
        <div className="flex justify-between gap-3">
          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <label htmlFor="dueDate" className="font-semibold text-small">
              Due Date
            </label>

            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  dueDate: e.target.value,
                })
              }
              required
              className="w-full min-w-0 border-2 border-secondary rounded-sm p-2 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <label htmlFor="priority" className="font-semibold text-small">
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={taskData.priority}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  priority: e.target.value,
                })
              }
              className="w-full border-2 border-secondary rounded-sm p-2 outline-none focus:border-primary"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary px-control py-2 hover:bg-primary-hover cursor-pointer rounded-sm text-white font-semibold"
        >
          Save Task
        </button>
      </form>
    </div>
  );
}



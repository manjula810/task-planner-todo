import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router";
import { useState } from "react";
import Modal from "../components/common/Modal";
import { useAddTask, useUpdateTask } from "../hooks/TaskHooks/useTask";

export default function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  
  function handleEditTask(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  async function handleSave(newTask){
    try {
      if (editingTask) {
        await updateTask.mutateAsync({
          id: editingTask._id,
          updatedTask: newTask,
        });
      } else {
        await addTask.mutateAsync(newTask);
      }

      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex">
      <SideBar />

      <div className="flex flex-col flex-1  min-w-0">
        <Header onAddTask={() => setIsModalOpen(true)} />

        <main className="flex-1 p-1 w-full h-full">
          <Outlet context={{ handleEditTask }} />

          {isModalOpen && (
            <Modal
              onClose={() => {
                setIsModalOpen(false);
                setEditingTask(null);
              }}
              onSave={handleSave}
              task={editingTask}
            />
          )}
        </main>
      </div>
    </div>
  );
}


import { useQuery,useMutation,useQueryClient  } from "@tanstack/react-query";



const API_URL = "https://task-planner-backend-2-vysu.onrender.com/api/tasks";


async function fetchTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data.tasks;
}

export  function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}


export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask) => {
      const response = await fetch(API_URL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create task");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedTask }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update task");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
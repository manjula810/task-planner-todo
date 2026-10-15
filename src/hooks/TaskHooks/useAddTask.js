import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/api/tasks";

export default function useAddTask() {
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

import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/api/tasks";

export default function useUpdateTask(){
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


import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/api/tasks";

async function fetchTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data.tasks;
}

export default function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}

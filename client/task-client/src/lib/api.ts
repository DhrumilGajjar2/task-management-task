import { Task } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks.");
  return res.json();
}

export async function createTask(task: Omit<Task, "_id" | "status">): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create task.");
  }
  return res.json();
}

export async function updateTask(id: string, task: Omit<Task, "_id" | "status">): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update task.");
  }
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete task.");
  }
}

export async function completeTask(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}/complete`, { method: "PATCH" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to complete task.");
  }
  return res.json();
}
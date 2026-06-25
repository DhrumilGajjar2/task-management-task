"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Filters from "@/components/Filters";
import { Task, Priority, Status } from "@/types/task";
import { getTasks, createTask, updateTask, deleteTask, completeTask } from "@/lib/api";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (taskData: Omit<Task, "_id" | "status">) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task.");
    }
  };

  const handleEditSave = async (taskData: Omit<Task, "_id" | "status">) => {
    if (!editingTask) return;
    try {
      const updated = await updateTask(editingTask._id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setEditingTask(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task.");
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const updated = await completeTask(id);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete task.");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <TaskForm
        onSubmit={editingTask ? handleEditSave : handleAdd}
        initialData={editingTask || undefined}
        onCancel={editingTask ? () => setEditingTask(null) : undefined}
      />

      <Filters
        priorityFilter={priorityFilter}
        statusFilter={statusFilter}
        onPriorityChange={setPriorityFilter}
        onStatusChange={setStatusFilter}
      />

      {loading ? (
        <p className="text-gray-500 text-center py-8">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      )}
    </main>
  );
}
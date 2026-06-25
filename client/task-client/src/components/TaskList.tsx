"use client";

import { Task } from "@/types/task";
import TaskItem from "./TaskItem";
import Filters from "@/components/Filters";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onComplete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center py-8">No tasks found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </div>
  );
}
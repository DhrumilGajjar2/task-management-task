"use client";

import { useState } from "react";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const priorityColors: Record<Task["priority"], string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskItem({ task, onEdit, onDelete, onComplete }: TaskItemProps) {
  const [completeError, setCompleteError] = useState("");

  const handleCompleteClick = () => {
    // Mirrors the backend rule, purely for instant UX feedback.
    if (!task.dueDate) {
      setCompleteError("Cannot complete: Due Date is missing.");
      return;
    }
    if (task.description.trim().length < 20) {
      setCompleteError("Cannot complete: Description must be at least 20 characters.");
      return;
    }
    setCompleteError("");
    onComplete(task._id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold ${task.status === "Completed" ? "line-through text-gray-400" : "text-gray-800"}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Due: {task.dueDate ? task.dueDate.slice(0, 10) :  "Not set"}</span>
        <span className={task.status === "Completed" ? "text-green-600 font-medium" : "text-gray-500"}>
          {task.status}
        </span>
      </div>

      {completeError && <p className="text-red-500 text-sm">{completeError}</p>}

      <div className="flex gap-2 pt-2">
        {task.status !== "Completed" && (
          <button
            onClick={handleCompleteClick}
            className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-700 transition"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-100 text-blue-700 text-sm px-3 py-1.5 rounded-md hover:bg-blue-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-100 text-red-700 text-sm px-3 py-1.5 rounded-md hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
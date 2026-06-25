"use client";

import { Priority, Status } from "@/types/task";

interface FiltersProps {
  priorityFilter: Priority | "All";
  statusFilter: Status | "All";
  onPriorityChange: (value: Priority | "All") => void;
  onStatusChange: (value: Status | "All") => void;
}

export default function Filters({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Filter by Priority</label>
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value as Priority | "All")}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Filter by Status</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as Status | "All")}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
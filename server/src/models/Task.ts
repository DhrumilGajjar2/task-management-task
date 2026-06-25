import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  dueDate: Date | null;
  status: "Pending" | "Completed";
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    dueDate: { type: Date, default: null },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
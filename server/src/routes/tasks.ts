import { Router, Request, Response } from "express";
import Task from "../models/Task";

const router = Router();

// CREATE TASK
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({ message: "Title, description, and priority are required." });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: dueDate || null,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task.", error: err });
  }
});

// GET ALL TASKS (supports optional ?priority= and ?status= query filters)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { priority, status } = req.query;
    const filter: Record<string, unknown> = {};
    if (priority) filter.priority = priority;
    if (status) filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks.", error: err });
  }
});

// UPDATE TASK
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate: dueDate || null },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task.", error: err });
  }
});

// DELETE TASK
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task.", error: err });
  }
});

// MARK COMPLETE — the logical challenge lives here
router.patch("/:id/complete", async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (!task.dueDate) {
      return res.status(400).json({ message: "Cannot complete task: Due Date is missing." });
    }

    if (task.description.trim().length < 20) {
      return res.status(400).json({
        message: "Cannot complete task: Description must be at least 20 characters.",
      });
    }

    task.status = "Completed";
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark task complete.", error: err });
  }
});

export default router;
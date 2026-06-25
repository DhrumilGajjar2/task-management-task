# Task Manager App

A full-stack task management application built with Next.js, TypeScript, Tailwind CSS, Express, and MongoDB.

## Live Demo
- **Frontend:** https://task-management-task-nine.vercel.app
- **Backend API:** https://task-management-task-l0hk.onrender.com/api/tasks

> Note: the backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30-50 seconds to respond while it wakes up.

## Features
- Add, edit, and delete tasks
- Mark tasks as complete
- View all tasks
- Filter tasks by priority and by status
- Validation: a task cannot be marked complete if the Due Date is missing or the Description is under 20 characters

## Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript, Mongoose
- **Database:** MongoDB (Atlas)
- **Deployment:** Vercel (frontend), Render (backend)

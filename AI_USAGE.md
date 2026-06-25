# AI Usage Documentation

## AI Tool Used
Claude (Anthropic)

## How AI Was Used

**Planning & Architecture**
Used Claude to scope a sensible project structure and feature breakdown, and to settle on a lean tech approach appropriate for an intern-level submission (e.g. plain Mongoose schema validation instead of a heavier ORM)

**Frontend**
Claude generated initial component scaffolds for TaskForm, TaskItem, TaskList, and Filters (React + TypeScript + Tailwind). I reviewed, tested, and adjusted these — including fixing a date-format mismatch between MongoDB's ISO date strings and the HTML date input, and a responsive layout tweak on the form's priority/due-date row.

**Backend**
Claude helped scaffold the Express + TypeScript server, the Mongoose Task schema, and the five REST routes (create, get all, update, delete, mark complete). The mark-complete validation logic (rejecting completion when due date is missing or description is under 20 characters) was discussed and implemented with AI assistance, then tested manually via Postman Client and Compass.

**Deployment & Debugging**
Claude provided step-by-step deployment guidance for Render (backend) and Vercel (frontend), and helped diagnose several real issues encountered along the way: migrating from local MongoDB to Atlas so the deployed backend could reach the database, a missing `MONGODB_URI` environment variable on Render, an incorrect Vercel Root Directory setting (project structure has the Next.js app nested at `client/task-client`), and an incomplete `NEXT_PUBLIC_API_URL` value missing the `/api/tasks` path. Each issue was diagnosed using browser DevTools network logs and Render/Vercel deployment logs before applying a fix.

## What I Did Myself
- Ran all setup commands, installed dependencies, and configured environment variables
- Tested every feature manually (add/edit/delete/complete/filters) both locally and on the live deployment
- Set up MongoDB Atlas, Compass connections, the GitHub repository, and the Render/Vercel deployments
- Diagnosed and resolved deployment issues by reading browser console errors and server logs
- Reviewed all AI-suggested code before using it and made adjustments where needed

## Reflection
AI was used as a coding assistant and pair-programming aid throughout — for scaffolding code, planning architecture, and helping debug deployment issues — similar to how I'd use documentation or Stack Overflow. I made the implementation decisions, ran and tested everything myself, and understand how each part of the app works.
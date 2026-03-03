# Team Task Manager Pro

## Overview
Full-stack team task management system with RBAC and soft delete functionality.

## Tech Stack
- Frontend: React (Vite + Tailwind)
- Backend: Supabase (Postgres + Auth + RLS)
- Deployment: Vercel (Frontend), Supabase (Backend)

## Features
- Authentication (Email + Password)
- Role-Based Access Control (Admin / Member)
- Team-based task management
- Soft delete implementation
- Supabase Row Level Security (RLS)

## Database Schema
Tables:
- teams
- profiles
- tasks

## RLS Policies
- Admin: full team access
- Member: own tasks only
- Soft delete using deleted_at column

## Setup Instructions

1. Clone repo
2. Install dependencies:
   npm install
3. Create .env file:
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
4. Run:
   npm run dev

## Live URL
(https://team-task-manager-xi.vercel.app/)
 

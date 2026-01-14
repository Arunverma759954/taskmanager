import React from "react";
import { useEffect, useMemo, useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    const parsed = saved ? JSON.parse(saved) : [];

    console.log("✅ LocalStorage Tasks (on load):", parsed);

    setTasks(parsed);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("🔄 Updated Tasks (saved to localStorage):", tasks);
  }, [tasks]);

   
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = total - completed;
    return { total, pending, completed };
  }, [tasks]);

  
  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    console.log("➕ Task Added:", newTask);

    setTasks([newTask, ...tasks]);
  };


  const markCompleted = (id) => {
    console.log("✅ Mark Completed Task ID:", id);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Completed" } : t))
    );
  };

  
  const deleteTask = (id) => {
    console.log("❌ Delete Task ID:", id);

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };


  const clearAll = () => {
    console.log("🧹 Clear All Tasks");
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2">
              Task Manager
            </h1>
             
          </div>

          <button
            onClick={clearAll}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-600 transition font-semibold cursor-pointer"
          >
            Clear All
          </button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <StatCard label="Total Tasks" value={stats.total} />
          <StatCard label="Pending" value={stats.pending} />
          <StatCard label="Completed" value={stats.completed} />
        </div>

        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur">
          <AddTask onAdd={addTask} />
          <TaskList
            tasks={tasks}
            onComplete={markCompleted}
            onDelete={deleteTask}
          />
        </div>

        <p className="text-center text-xs text-white/40 mt-10">
          Built by Arun • Task Manager App
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
      <p className="text-xs text-white/55 uppercase tracking-widest">{label}</p>
      <p className="text-3xl sm:text-4xl font-extrabold mt-2">{value}</p>
    </div>
  );
}

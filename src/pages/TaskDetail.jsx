import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (!saved) {
      console.log("⚠ No tasks found in localStorage");
      setTask(undefined);
      return;
    }

    const tasks = JSON.parse(saved);
    const found = tasks.find((t) => t.id === id);

    console.log("📌 Task Detail Page ID:", id);
    console.log("📌 Task Found:", found);

    setTask(found || undefined);
  }, [id]);

  // Loading
  if (task === null) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        Loading...
      </div>
    );
  }

  // Not found
  if (task === undefined) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <p className="text-red-300 text-lg font-bold">Task not found ❌</p>
        <Link className="underline mt-3 inline-block" to="/">
          Go Back
        </Link>
      </div>
    );
  }

  const completed = task.status === "Completed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link to="/" className="text-sm text-white/70 hover:underline">
          ← Back to Home
        </Link>

        <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Task Detail
          </p>

          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3">
            {task.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className={
                "text-sm px-4 py-2 rounded-full border font-bold " +
                (completed
                  ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-200"
                  : "bg-amber-500/15 border-amber-400/30 text-amber-200")
              }
            >
              {task.status}
            </span>

            <span className="text-sm px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70">
              Created: {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

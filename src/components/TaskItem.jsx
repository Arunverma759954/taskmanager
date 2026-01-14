import React from "react";
import { Link } from "react-router-dom";

export default function TaskItem({ task, onComplete, onDelete }) {
  const completed = task.status === "Completed";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left */}
      <div className="min-w-0">
        <Link
          to={`/tasks/${task.id}`}
          className="block font-extrabold text-base sm:text-lg truncate hover:underline"
        >
          {task.title}
        </Link>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span
            className={
              "text-xs px-3 py-1 rounded-full border font-semibold " +
              (completed
                ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-200"
                : "bg-amber-500/15 border-amber-400/30 text-amber-200")
            }
          >
            {completed ? "Completed" : "Pending"}
          </span>

          <span className="text-xs text-white/40">
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      
      <div className="flex gap-2 shrink-0">
        {!completed && (
          <button
            onClick={() => onComplete(task.id)}
            className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 transition font-bold active:scale-[0.98] cursor-pointer"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 rounded-2xl bg-red-500/90 hover:bg-red-600 transition font-bold active:scale-[0.98] cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

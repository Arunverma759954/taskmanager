import React from "react";
import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty!");
      console.log("⚠ Validation Error: Empty Task");
      return;
    }

    onAdd(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <div className="mb-6">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write a new task..."
          className="flex-1 rounded-2xl bg-white/10 border border-white/10 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/70"
        />

        <button className="rounded-2xl px-5 py-3.5 text-sm font-bold bg-indigo-500 hover:bg-indigo-600 transition active:scale-[0.98] cursor-pointer">
          + Add Task
        </button>
      </form>

      {error && <p className="text-red-300 text-sm mt-2">⚠ {error}</p>}
    </div>
  );
}

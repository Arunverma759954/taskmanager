import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onComplete, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-12 rounded-3xl border border-dashed border-white/15 bg-white/5">
        <p className="text-white/80 font-bold text-lg">No tasks yet ✅</p>
        <p className="text-white/40 text-sm mt-2">
          Add your first task to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

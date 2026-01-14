import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
    </Routes>
  );
}

import React, { useState } from "react";
import { createTask } from "../api/taskApi";

export default function TaskModal({ isOpen, onClose, projectId, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: 1, 
    status: 0,   
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    try {
      setLoading(true);

      await createTask(projectId, {
        title: form.title,
        description: form.description,
        priority: Number(form.priority),
        status: Number(form.status),
        dueDate: form.dueDate
          ? new Date(form.dueDate).toISOString()
          : null,
      });

      onSuccess();
      onClose();

      setForm({
        title: "",
        description: "",
        priority: 1,
        status: 0,
        dueDate: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-[420px] space-y-4">

        <h2 className="text-xl font-semibold">Create Task</h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 rounded bg-black/40 outline-none"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-2 rounded bg-black/40 outline-none"
        />

        {/* Priority */}
        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: Number(e.target.value) })
          }
          className="w-full p-2 rounded bg-black/40"
        >
          <option value={0}>Low</option>
          <option value={1}>Medium</option>
          <option value={2}>High</option>
          <option value={3}>Critical</option>
        </select>

        {/* Status */}
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: Number(e.target.value) })
          }
          className="w-full p-2 rounded bg-black/40"
        >
          <option value={0}>Todo</option>
          <option value={1}>In Progress</option>
          <option value={2}>Review</option>
          <option value={3}>Done</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
          className="w-full p-2 rounded bg-black/40"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>

      </div>
    </div>
  );
}
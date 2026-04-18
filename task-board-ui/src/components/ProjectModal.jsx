import React, { useState } from "react";
import { createProject } from "../api/projectApi";

export default function ProjectModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.name.trim()) return;

    try {
      setLoading(true);

      await createProject({
        ...form,
        createdAt: new Date().toISOString(),
      });

      onSuccess(); 
      onClose();   

      // reset form
      setForm({ name: "", description: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 w-[400px] shadow-xl space-y-4">

        <h2 className="text-xl font-semibold">Create Project</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Project name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
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

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
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
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
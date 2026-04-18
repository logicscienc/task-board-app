import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../api/taskApi";
import { getComments, createComment, deleteComment } from "../api/commentApi";

export default function TaskDetail() {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: 0,
    status: 0,
    dueDate: "",
  });

  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(id);
        setTask(taskData);

        setForm({
          title: taskData.title,
          description: taskData.description || "",
          priority: taskData.priority,
          status: taskData.status,
          dueDate: taskData.dueDate
            ? taskData.dueDate.split("T")[0]
            : "",
        });

        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Update Task
  const handleUpdate = async () => {
    try {
      setSaving(true);

      await updateTask(id, {
        ...form,
        projectId: task.projectId,
      });

      alert("Task updated!");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setAddingComment(true);

      const comment = await createComment(id, {
        author: "You",
        body: newComment,
      });

      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setAddingComment(false);
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1">
        <Navbar onMenuClick={() => setIsOpen(true)} />

        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold">Task Detail</h1>

          {/*  Task Edit Section */}
          <div className="bg-white/5 p-6 rounded-2xl shadow-md space-y-5">

            {/* Title */}
            <div>
              <label className="text-sm text-gray-400">Title</label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full mt-1 p-2 rounded bg-black/40 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full mt-1 p-2 rounded bg-black/40 outline-none"
              />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-4">

              <div>
                <label className="text-sm text-gray-400">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 bg-black/40 p-2 rounded"
                >
                  <option value={0}>Low</option>
                  <option value={1}>Medium</option>
                  <option value={2}>High</option>
                  <option value={3}>Critical</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 bg-black/40 p-2 rounded"
                >
                  <option value={0}>Todo</option>
                  <option value={1}>In Progress</option>
                  <option value={2}>Review</option>
                  <option value={3}>Done</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dueDate: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-black/40 p-2 rounded"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className={`px-4 py-2 rounded transition ${
                saving
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/*  Comments Section */}
          <div className="bg-white/5 p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Comments</h2>

            {/* Add Comment */}
            <div className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-2 rounded bg-black/40 outline-none"
                placeholder="Write a comment..."
              />

              <button
                onClick={handleAddComment}
                disabled={!newComment.trim() || addingComment}
                className={`px-4 rounded ${
                  !newComment.trim()
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {addingComment ? "Adding..." : "Add"}
              </button>
            </div>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-gray-400">No comments yet</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-white/5 p-3 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">{c.body}</p>
                    <p className="text-xs text-gray-400">
                      by {c.author}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks } from "../api/taskApi";
import { FiPlus, FiFilter } from "react-icons/fi";
import TaskModal from "../components/TaskModal";
import {toast} from "react-toastify";

export default function ProjectBoard() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Filters
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  // Pagination
  const [page, setPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, priority, sortBy, sortDir]);

  // Fetch tasks
 const fetchTasks = async () => {
  try {
    setLoading(true);

    const data = await getTasks(projectId, {
      status,
      priority,
      sortBy,
      sortDir,
      page,
      pageSize: 10,
    });

    setTasks(data.data);
    setTotalPages(data.totalPages);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, [projectId, status, priority, sortBy, sortDir, page]);

  const getPriorityColor = (p) => {
    return ["text-green-400", "text-yellow-400", "text-orange-400", "text-red-400"][p] || "text-gray-400";
  };

  const getStatusText = (s) => {
    return ["Todo", "In Progress", "Review", "Done"][s] || "Unknown";
  };

  const handleOpenTaskModal = () => {
  setShowTaskModal(true);
};

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1">
        <Navbar

         onMenuClick={() => setIsOpen(true)}
           onNewTask={() => setShowTaskModal(true)} />

        <div className="p-6 space-y-6 max-w-6xl mx-auto">

          {/* 🔹 Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">Project Tasks</h1>
              <p className="text-sm text-gray-400">
                Manage and track all tasks in this project
              </p>
            </div>

            <button
            onClick={handleOpenTaskModal} className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition">
              <FiPlus />
              Add Task
            </button>
          </div>

          {/* 🔹 Filters */}
          <div className="bg-white/5 p-4 rounded-xl shadow-md flex flex-wrap gap-4 items-center">
            <FiFilter className="text-gray-400" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-black/40 p-2 rounded outline-none"
            >
              <option value="">All Status</option>
              <option value="0">Todo</option>
              <option value="1">In Progress</option>
              <option value="2">Review</option>
              <option value="3">Done</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-black/40 p-2 rounded outline-none"
            >
              <option value="">All Priority</option>
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
              <option value="3">Critical</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/40 p-2 rounded outline-none"
            >
              <option value="createdAt">Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>

            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value)}
              className="bg-black/40 p-2 rounded outline-none"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center text-gray-400 py-10">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No tasks found for this project.
            </div>
          ) : (
            <>
              {/* Task Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => {
                  const isOverdue =
                    task.dueDate &&
                    new Date(task.dueDate) < new Date();

                  return (
                    <div
                      key={task.id}
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      className="bg-white/5 p-5 rounded-2xl shadow-md hover:scale-[1.03] transition cursor-pointer border border-white/10"
                    >
                      <h2 className="text-lg font-semibold">
                        {task.title}
                      </h2>

                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {task.description || "No description"}
                      </p>

                      {/* Status + Priority */}
                      <div className="mt-4 flex justify-between text-sm">
                        <span className={getPriorityColor(task.priority)}>
                          {["Low", "Medium", "High", "Critical"][task.priority]}
                        </span>

                        <span className="text-gray-300">
                          {getStatusText(task.status)}
                        </span>
                      </div>

                      {/* Due */}
                      {task.dueDate && (
                        <div
                          className={`mt-3 text-sm ${
                            isOverdue ? "text-red-400" : "text-yellow-400"
                          }`}
                        >
                          {isOverdue
                            ? "Overdue"
                            : `Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 items-center mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={`px-4 py-2 rounded ${
                    page === 1
                      ? "bg-white/5 text-gray-500 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Prev
                </button>

                <span className="text-sm text-gray-300">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className={`px-4 py-2 rounded ${
                    page === totalPages
                      ? "bg-white/5 text-gray-500 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CLEAN MODAL INTEGRATION */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        projectId={projectId}
        onSuccess={() => {
  // 1. Close modal smoothly
  setShowTaskModal(false);

  // 2. Refresh data
  fetchTasks();

  // 3. Show toast
  toast.success("Task created successfully 🎉");
}}
      />
    </div>
  );
}

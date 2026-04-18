import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getProjects } from "../api/projectApi";
import { useNavigate } from "react-router-dom";
import { FiFolder, FiPlus } from "react-icons/fi";
import ProjectModal from "../components/ProjectModal";
import {toast} from "react-toastify";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

 const fetchProjects = async () => {
  try {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
  } catch (err) {
    console.error(err);
    setError("Failed to load projects");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProjects();
}, []);

  if (loading)
    return (
      <div className="p-6 text-gray-400">Loading projects...</div>
    );

  if (error)
    return (
      <div className="p-6 text-red-400">{error}</div>
    );

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <div className="flex-1">
        <Navbar onMenuClick={() => setIsOpen(true)} />

        <div className="p-6 space-y-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <FiFolder /> Projects
            </h1>

            <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition hover: cursor-pointer">
              <FiPlus />
              Add Project
            </button>
          </div>

          {/*  Empty State */}
          {projects.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-lg">No projects yet</p>
              <p className="text-sm mt-2">
                Start by creating your first project 🚀
              </p>
            </div>
          ) : (
            /*  Projects Grid */
            <div className="grid grid-cols-3 gap-6">
              {projects.map((project) => {
                const todo =
                  project.tasks?.filter((t) => t.status === 0).length || 0;

                const inProgress =
                  project.tasks?.filter((t) => t.status === 1).length || 0;

                const review =
                  project.tasks?.filter((t) => t.status === 2).length || 0;

                const done =
                  project.tasks?.filter((t) => t.status === 3).length || 0;

                return (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="
                      bg-white/5 
                      border border-white/10
                      p-5 
                      rounded-2xl 
                      shadow-md
                      hover:scale-[1.03] 
                      hover:shadow-lg
                      hover:border-white/20
                      transition 
                      cursor-pointer
                      backdrop-blur-md
                    "
                  >
                    {/* Title */}
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <FiFolder className="text-blue-400" />
                      {project.name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {project.description || "No description"}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-white/10 my-4"></div>

                    {/* Status */}
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-gray-400">Todo:</span>{" "}
                        <span className="text-white">{todo}</span>
                      </p>
                      <p>
                        <span className="text-blue-400">In Progress:</span>{" "}
                        {inProgress}
                      </p>
                      <p>
                        <span className="text-purple-400">Review:</span>{" "}
                        {review}
                      </p>
                      <p>
                        <span className="text-green-400">Done:</span>{" "}
                        {done}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-xs text-gray-500">
                      Created:{" "}
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ADD MODAL HERE (BOTTOM OF PAGE JSX) */}
    <ProjectModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSuccess={() => {
    fetchProjects(); // refresh data
    toast.success("Project created successfully 🎉");

    // smooth close (optional UX improvement)
    setTimeout(() => {
      setShowModal(false);
    }, 200);
  }}
/>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getDashboard } from "../api/dashboardApi";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard(); 
        setDashboard(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading State
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Error State
  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

 return (
  <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

    {/* Sidebar */}
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

    {/* Main */}
    <div className="flex-1">

      <Navbar onMenuClick={() => setIsOpen(true)} />

      <div className="p-6 space-y-8 max-w-7xl mx-auto">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Overview of your projects and task progress
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:scale-[1.03] transition shadow-lg">
            <p className="text-sm text-gray-400">Total Projects</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {dashboard?.totalProjects ?? 0}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:scale-[1.03] transition shadow-lg">
            <p className="text-sm text-gray-400">Total Tasks</p>
            <h2 className="text-3xl font-bold mt-2 text-white">
              {dashboard?.totalTasks ?? 0}
            </h2>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 backdrop-blur-md hover:scale-[1.03] transition shadow-lg">
            <p className="text-sm text-red-300">Overdue Tasks</p>
            <h2 className="text-3xl font-bold mt-2 text-red-400">
              {dashboard?.overdueTasks ?? 0}
            </h2>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 backdrop-blur-md hover:scale-[1.03] transition shadow-lg">
            <p className="text-sm text-yellow-300">Due Soon</p>
            <h2 className="text-3xl font-bold mt-2 text-yellow-400">
              {dashboard?.dueSoon ?? 0}
            </h2>
          </div>

        </div>

        {/* STATUS SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg">

          <h2 className="text-lg font-semibold mb-6">
            Task Status Breakdown
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">

            <div className="p-4 rounded-xl bg-black/20 hover:bg-black/30 transition">
              <p className="text-gray-400 text-sm">Todo</p>
              <h3 className="text-2xl font-bold mt-1">
                {dashboard?.statusBreakdown?.todo ?? 0}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition">
              <p className="text-blue-300 text-sm">In Progress</p>
              <h3 className="text-2xl font-bold mt-1 text-blue-400">
                {dashboard?.statusBreakdown?.inProgress ?? 0}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition">
              <p className="text-purple-300 text-sm">Review</p>
              <h3 className="text-2xl font-bold mt-1 text-purple-400">
                {dashboard?.statusBreakdown?.review ?? 0}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition">
              <p className="text-green-300 text-sm">Done</p>
              <h3 className="text-2xl font-bold mt-1 text-green-400">
                {dashboard?.statusBreakdown?.done ?? 0}
              </h3>
            </div>

          </div>
        </div>

        {/* EXTRA SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Upcoming Tasks</h2>
          <p className="text-gray-400 text-sm">
            This section will show upcoming deadlines and priority tasks soon.
          </p>
        </div>

      </div>
    </div>
  </div>
);
}


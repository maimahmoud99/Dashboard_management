/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRealtime } from "@/lib/RealtimeContext";
import Cookies from "js-cookie";

type Project = {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
};

type ProjectTableProps = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  role: string | null;
};

export default function ProjectTable({ projects, setProjects, role }: ProjectTableProps) {
  const router = useRouter();
  const { broadcastUpdate } = useRealtime();
  
  // Get user email from cookies
  const userEmail = Cookies.get("email") || "Unknown User";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [progressFilter, setProgressFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<keyof Project>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProgress, setEditingProgress] = useState<{ id: number; value: number } | null>(null);
  const itemsPerPage = 5;

  // Filter and Sort
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;
      
      let matchesProgress = true;
      if (progressFilter === "low") matchesProgress = project.progress < 33;
      else if (progressFilter === "medium") matchesProgress = project.progress >= 33 && project.progress < 66;
      else if (progressFilter === "high") matchesProgress = project.progress >= 66;
      
      return matchesSearch && matchesStatus && matchesProgress;
    });

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return filtered;
  }, [projects, searchTerm, statusFilter, progressFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: keyof Project) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleProgressEdit = (id: number, newProgress: number) => {
    // Only Admin and ProjectManager can edit
    if (role !== "Admin" && role !== "ProjectManager") {
      alert("⚠️ You don't have permission to edit. Only Admin and Project Manager can modify progress.");
      setEditingProgress(null);
      return;
    }

    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, progress: Math.min(100, Math.max(0, newProgress)) } : p
    );
    
    setProjects(updatedProjects);
    setEditingProgress(null);

    // Broadcast real-time update
    const projectName = projects.find((p) => p.id === id)?.name;
    broadcastUpdate({
      type: "project_updated",
      projectId: id,
      data: { progress: newProgress },
      user: userEmail,
    });

    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.innerHTML = `✅ Progress updated for "${projectName}"!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const startEditingProgress = (id: number, currentProgress: number) => {
    if (role !== "Admin" && role !== "ProjectManager") {
      alert("⚠️ You don't have permission to edit.");
      return;
    }
    setEditingProgress({ id, value: currentProgress });
  };

  const cancelEditingProgress = () => {
    setEditingProgress(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            aria-label="Search projects"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by status"
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
          <select
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by progress"
          >
            <option value="all">All Progress</option>
            <option value="low">Low (&lt;33%)</option>
            <option value="medium">Medium (33-66%)</option>
            <option value="high">High (&gt;66%)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                { key: "name", label: "Name" },
                { key: "status", label: "Status" },
                { key: "startDate", label: "Start Date" },
                { key: "endDate", label: "End Date" },
                { key: "progress", label: "Progress" },
                { key: "budget", label: "Budget" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof Project)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortBy === col.key && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {project.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.startDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.endDate}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    {editingProgress?.id === project.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editingProgress.value}
                          onChange={(e) =>
                            setEditingProgress({
                              ...editingProgress,
                              value: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-14 px-2 py-1 text-xs border-2 border-indigo-500 rounded"
                          min="0"
                          max="100"
                        />
                        <button
                          onClick={() =>
                            handleProgressEdit(project.id, editingProgress.value)
                          }
                          className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEditingProgress}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          startEditingProgress(project.id, project.progress)
                        }
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        disabled={role !== "Admin" && role !== "ProjectManager"}
                      >
                        {project.progress}%
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${project.budget.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => router.push(`/dashboard/project/${project.id}`)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of{" "}
          {filteredProjects.length} projects
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
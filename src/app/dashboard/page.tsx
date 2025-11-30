"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ProjectTable from "./components/ProjectTable";
import Cookies from "js-cookie";
import { TableSkeleton } from "@/app/dashboard/components/Skeleton";
import { useRealtime } from "@/lib/RealtimeContext";

type Project = {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
};

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    progress: 40,
    budget: 15000
  },
  {
    id: 2,
    name: "Mobile App",
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2024-01-10",
    progress: 100,
    budget: 25000
  },
  {
    id: 3,
    name: "CRM Integration",
    status: "On Hold",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    progress: 15,
    budget: 20000
  },
  {
    id: 4,
    name: "E-commerce Platform",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    progress: 55,
    budget: 45000
  },
  {
    id: 5,
    name: "Cloud Migration",
    status: "In Progress",
    startDate: "2024-02-10",
    endDate: "2024-04-15",
    progress: 30,
    budget: 35000
  },
  {
    id: 6,
    name: "Data Analytics Dashboard",
    status: "Completed",
    startDate: "2023-09-01",
    endDate: "2023-12-20",
    progress: 100,
    budget: 18000
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { role: reduxRole, userEmail: reduxEmail } = useSelector((state: RootState) => state.auth);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentUpdate, setRecentUpdate] = useState<string | null>(null);
  const { subscribeToUpdates } = useRealtime();

  // Get role and email from cookies if Redux is empty
  const role = reduxRole || (Cookies.get("role") as "Admin" | "ProjectManager" | "Developer" | null);
  const userEmail = reduxEmail || Cookies.get("email") || "User";

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProjects(MOCK_PROJECTS);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToUpdates((update) => {
      if (update.user !== userEmail) {
        setRecentUpdate(`${update.user} updated a project`);
        setTimeout(() => setRecentUpdate(null), 3000);
      }
    });

    return unsubscribe;
  }, [subscribeToUpdates, userEmail]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("email");
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-8">
          <TableSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Project Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Logged in as: <span className="font-medium">{userEmail}</span> (
              {role})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {recentUpdate && (
          <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <p className="text-blue-700 font-medium">🔔 {recentUpdate}</p>
            </div>
          </div>
        )}
        <ProjectTable projects={projects} setProjects={setProjects} role={role} />
      </main>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRealtime } from "@/lib/RealtimeContext";
import Cookies from "js-cookie";

type Task = {
  id: number;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  assignedTo: string;
  priority: "Low" | "Medium" | "High";
};

type Project = {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
  description: string;
  tasks: Task[];
};

const MOCK_PROJECT_DETAILS: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    progress: 40,
    budget: 15000,
    description: "Complete redesign of the company website with modern UI/UX principles.",
    tasks: [
      { id: 1, title: "Design mockups", status: "Done", assignedTo: "John Doe", priority: "High" },
      { id: 2, title: "Implement homepage", status: "In Progress", assignedTo: "Jane Smith", priority: "High" },
      { id: 3, title: "Add contact form", status: "Todo", assignedTo: "Unassigned", priority: "Medium" },
    ],
  },
  {
    id: 2,
    name: "Mobile App",
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2024-01-10",
    progress: 100,
    budget: 25000,
    description: "Native mobile application for iOS and Android.",
    tasks: [
      { id: 4, title: "Setup project", status: "Done", assignedTo: "Mike Johnson", priority: "High" },
      { id: 5, title: "Implement auth", status: "Done", assignedTo: "Sarah Williams", priority: "High" },
    ],
  },
  {
    id: 3,
    name: "CRM Integration",
    status: "On Hold",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    progress: 15,
    budget: 20000,
    description: "Integration with Salesforce CRM system.",
    tasks: [
      { id: 7, title: "API research", status: "Done", assignedTo: "Alex Brown", priority: "High" },
      { id: 8, title: "Build integration", status: "Todo", assignedTo: "Unassigned", priority: "High" },
    ],
  },
  {
    id: 4,
    name: "E-commerce Platform",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    progress: 55,
    budget: 45000,
    description: "Building a full-featured e-commerce platform.",
    tasks: [
      { id: 9, title: "Product catalog", status: "Done", assignedTo: "Emma Davis", priority: "High" },
    ],
  },
  {
    id: 5,
    name: "Cloud Migration",
    status: "In Progress",
    startDate: "2024-02-10",
    endDate: "2024-04-15",
    progress: 30,
    budget: 35000,
    description: "Migrating legacy infrastructure to AWS.",
    tasks: [
      { id: 11, title: "Infrastructure planning", status: "Done", assignedTo: "Noah Martinez", priority: "High" },
    ],
  },
  {
    id: 6,
    name: "Data Analytics Dashboard",
    status: "Completed",
    startDate: "2023-09-01",
    endDate: "2023-12-20",
    progress: 100,
    budget: 18000,
    description: "Real-time analytics dashboard.",
    tasks: [
      { id: 13, title: "Data pipeline", status: "Done", assignedTo: "Sophia Rodriguez", priority: "High" },
    ],
  },
];

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const { broadcastUpdate, subscribeToUpdates } = useRealtime();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [recentUpdate, setRecentUpdate] = useState<string | null>(null);

  const userEmail = Cookies.get("email") || "Unknown User";

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundProject = MOCK_PROJECT_DETAILS.find((p) => p.id === projectId);
      setProject(foundProject || null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [projectId]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToUpdates((update) => {
      // Only show notification if it's for this project and from another user
      if (update.projectId === projectId && update.user !== userEmail) {
        setRecentUpdate(`${update.user} updated a task`);
        
        // Auto-clear after 3 seconds
        setTimeout(() => {
          setRecentUpdate(null);
        }, 3000);
      }
    });

    return unsubscribe;
  }, [subscribeToUpdates, projectId, userEmail]);

  const addTask = () => {
    if (!newTaskTitle.trim() || !project) return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      status: "Todo",
      assignedTo: "Unassigned",
      priority: "Medium",
    };

    setProject({
      ...project,
      tasks: [...project.tasks, newTask],
    });
    setNewTaskTitle("");
  };

  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    if (!project) return;

    const updatedProject = {
      ...project,
      tasks: project.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    };

    setProject(updatedProject);

    // Broadcast update
    broadcastUpdate({
      type: "task_updated",
      projectId: project.id,
      taskId,
      data: { status: newStatus },
      user: userEmail,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Details</h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Real-time Update Notification */}
        {recentUpdate && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <p className="text-blue-700 font-medium">🔔 {recentUpdate}</p>
            </div>
          </div>
        )}

        {/* Project Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {project.name}
          </h2>
          <p className="text-gray-600 mb-6">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="font-semibold text-gray-900">{project.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-gray-900">
                  {project.progress}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Budget</p>
              <p className="font-semibold text-gray-900">
                ${project.budget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Start Date</p>
              <p className="font-semibold text-gray-900">{project.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">End Date</p>
              <p className="font-semibold text-gray-900">{project.endDate}</p>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tasks</h3>

          {/* Add Task */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <button
              onClick={addTask}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Assigned to: {task.assignedTo}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(task.id, e.target.value as Task["status"])
                  }
                  className={`px-3 py-2 rounded-lg border-2 font-semibold ${
                    task.status === "Done"
                      ? "border-green-500 text-green-700 bg-green-50"
                      : task.status === "In Progress"
                      ? "border-blue-500 text-blue-700 bg-blue-50"
                      : "border-gray-300 text-gray-700 bg-white"
                  }`}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
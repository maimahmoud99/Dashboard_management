"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type Project = {
  id: number;
  name: string;
  status: string;
  progress: number;
  budget: number;
};

type ProjectChartsProps = {
  projects: Project[];
};

const STATUS_COLORS: Record<string, string> = {
  "Completed": "#10b981",
  "In Progress": "#3b82f6",
  "On Hold": "#f59e0b",
};

export default function ProjectCharts({ projects }: ProjectChartsProps) {
  // Progress data for bar chart
  const progressData = projects.map((p) => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name,
    progress: p.progress,
  }));

  // Status distribution for pie chart
  const statusCounts = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    color: STATUS_COLORS[status] || "#6b7280",
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Progress Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Project Progress
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              fontSize={12}
            />
            <YAxis 
              label={{ value: "Progress (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="progress" fill="#6366f1" name="Progress %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Project Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
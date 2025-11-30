import { NextResponse } from "next/server";

const projects = [
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

export async function GET() {
  console.log("✅ GET /api/projects called");
  return NextResponse.json(projects);
}
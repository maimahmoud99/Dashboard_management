import { NextResponse } from "next/server";

const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    progress: 40,
    budget: 15000,
    description: "Complete redesign of the company website with modern UI/UX principles and responsive design.",
    tasks: [
      {
        id: 1,
        title: "Design mockups",
        status: "Done",
        assignedTo: "John Doe",
        priority: "High",
      },
      {
        id: 2,
        title: "Implement homepage",
        status: "In Progress",
        assignedTo: "Jane Smith",
        priority: "High",
      },
      {
        id: 3,
        title: "Add contact form",
        status: "Todo",
        assignedTo: "Unassigned",
        priority: "Medium",
      },
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
    description: "Native mobile application for iOS and Android with cross-platform features.",
    tasks: [
      {
        id: 4,
        title: "Setup project structure",
        status: "Done",
        assignedTo: "Mike Johnson",
        priority: "High",
      },
      {
        id: 5,
        title: "Implement authentication",
        status: "Done",
        assignedTo: "Sarah Williams",
        priority: "High",
      },
      {
        id: 6,
        title: "Deploy to app stores",
        status: "Done",
        assignedTo: "Mike Johnson",
        priority: "Medium",
      },
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
    description: "Integration with Salesforce CRM system for better customer management.",
    tasks: [
      {
        id: 7,
        title: "API research",
        status: "Done",
        assignedTo: "Alex Brown",
        priority: "High",
      },
      {
        id: 8,
        title: "Build integration layer",
        status: "Todo",
        assignedTo: "Unassigned",
        priority: "High",
      },
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
    description: "Building a full-featured e-commerce platform with payment integration.",
    tasks: [
      {
        id: 9,
        title: "Product catalog",
        status: "Done",
        assignedTo: "Emma Davis",
        priority: "High",
      },
      {
        id: 10,
        title: "Shopping cart",
        status: "In Progress",
        assignedTo: "Liam Wilson",
        priority: "High",
      },
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
    description: "Migrating legacy infrastructure to AWS cloud services.",
    tasks: [
      {
        id: 11,
        title: "Infrastructure planning",
        status: "Done",
        assignedTo: "Noah Martinez",
        priority: "High",
      },
      {
        id: 12,
        title: "Database migration",
        status: "In Progress",
        assignedTo: "Olivia Garcia",
        priority: "High",
      },
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
    description: "Real-time analytics dashboard for business intelligence.",
    tasks: [
      {
        id: 13,
        title: "Data pipeline setup",
        status: "Done",
        assignedTo: "Sophia Rodriguez",
        priority: "High",
      },
      {
        id: 14,
        title: "Visualization components",
        status: "Done",
        assignedTo: "James Lee",
        priority: "Medium",
      },
    ],
  },
];

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const projectId = parseInt(id);
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}
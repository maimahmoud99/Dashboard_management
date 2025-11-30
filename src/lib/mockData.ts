export const mockProjects = [
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

export const mockProjectDetails = [
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
      { id: 1, title: "Design mockups", status: "Done" as const, assignedTo: "John Doe", priority: "High" as const },
      { id: 2, title: "Implement homepage", status: "In Progress" as const, assignedTo: "Jane Smith", priority: "High" as const },
      { id: 3, title: "Add contact form", status: "Todo" as const, assignedTo: "Unassigned", priority: "Medium" as const },
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
      { id: 4, title: "Setup project", status: "Done" as const, assignedTo: "Mike Johnson", priority: "High" as const },
      { id: 5, title: "Implement auth", status: "Done" as const, assignedTo: "Sarah Williams", priority: "High" as const },
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
      { id: 7, title: "API research", status: "Done" as const, assignedTo: "Alex Brown", priority: "High" as const },
      { id: 8, title: "Build integration", status: "Todo" as const, assignedTo: "Unassigned", priority: "High" as const },
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
      { id: 9, title: "Product catalog", status: "Done" as const, assignedTo: "Emma Davis", priority: "High" as const },
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
      { id: 11, title: "Infrastructure planning", status: "Done" as const, assignedTo: "Noah Martinez", priority: "High" as const },
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
      { id: 13, title: "Data pipeline", status: "Done" as const, assignedTo: "Sophia Rodriguez", priority: "High" as const },
    ],
  },
];
export interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: "new" | "in-progress" | "resolved"
}

export const inquiries: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "K2 Base Camp Trek Inquiry",
    message: "I'm interested in the K2 Base Camp Trek. Can you provide more details about the fitness requirements?",
    date: "2023-06-15T10:30:00Z",
    status: "new",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Hunza Valley Tour Question",
    message:
      "Hi, I'd like to know if the Hunza Valley Explorer tour is available in September. Also, are there any discounts for groups?",
    date: "2023-06-16T14:45:00Z",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    subject: "Custom Tour Request",
    message:
      "I'm looking to organize a custom tour for a group of 8 people. We're interested in combining trekking and cultural experiences. Can you help with this?",
    date: "2023-06-17T09:15:00Z",
    status: "new",
  },
  // Add more inquiries as needed...
]


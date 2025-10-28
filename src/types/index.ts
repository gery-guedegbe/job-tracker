export type ApplicationStatus =
  | "to_apply"
  | "sent"
  | "followed_up"
  | "interview"
  | "offer"
  | "rejected";

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  applicationDate: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  applicationId?: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  applicationId: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  theme: "light" | "dark";
  language: "fr" | "en";
  autoSave: boolean;
  onboardingCompleted: boolean;
}

export const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string }
> = {
  to_apply: {
    label: "À postuler",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  sent: {
    label: "Envoyée",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  followed_up: {
    label: "Relancée",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  interview: {
    label: "Entretien",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  offer: {
    label: "Offre reçue",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  rejected: {
    label: "Rejetée",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};

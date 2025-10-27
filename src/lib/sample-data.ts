import type { Application, Task, Note } from "../types/index";

export const sampleApplications: Application[] = [
  {
    id: "app-1",
    jobTitle: "Développeur Full Stack",
    company: "TechCorp",
    status: "sent",
    applicationDate: "2025-10-10",
    notes:
      "Entretien technique prévu la semaine prochaine. Stack: React, Node.js, PostgreSQL",
    tags: ["Tech", "Remote"],
    createdAt: "2025-10-10T10:00:00Z",
    updatedAt: "2025-10-10T10:00:00Z",
  },
  {
    id: "app-2",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "interview",
    applicationDate: "2025-10-08",
    notes: "Très bonne culture d'entreprise. Salaire négociable.",
    tags: ["Management", "Startup"],
    createdAt: "2025-10-08T10:00:00Z",
    updatedAt: "2025-10-15T10:00:00Z",
  },
  {
    id: "app-3",
    jobTitle: "UX/UI Designer",
    company: "DesignStudio",
    status: "to_apply",
    applicationDate: "2025-10-17",
    notes: "Portfolio à préparer. Candidature spontanée.",
    tags: ["Design", "Créatif"],
    createdAt: "2025-10-17T10:00:00Z",
    updatedAt: "2025-10-17T10:00:00Z",
  },
  {
    id: "app-4",
    jobTitle: "Data Scientist",
    company: "BigData Inc",
    status: "followed_up",
    applicationDate: "2025-09-28",
    notes: "Relancé par email le 10 octobre. En attente de réponse.",
    tags: ["Data", "AI"],
    createdAt: "2025-09-28T10:00:00Z",
    updatedAt: "2025-10-10T10:00:00Z",
  },
  {
    id: "app-5",
    jobTitle: "DevOps Engineer",
    company: "CloudSolutions",
    status: "offer",
    applicationDate: "2025-09-20",
    notes: "Offre reçue: 55k€ + télétravail 3j/semaine. À négocier.",
    tags: ["DevOps", "Cloud"],
    createdAt: "2025-09-20T10:00:00Z",
    updatedAt: "2025-10-15T10:00:00Z",
  },
  {
    id: "app-6",
    jobTitle: "Frontend Developer",
    company: "WebAgency",
    status: "rejected",
    applicationDate: "2025-09-15",
    notes: "Profil non retenu. Manque d'expérience en Vue.js.",
    tags: ["Frontend"],
    createdAt: "2025-09-15T10:00:00Z",
    updatedAt: "2025-09-25T10:00:00Z",
  },
];

export const sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "Relancer TechCorp",
    description: "Envoyer un email de suivi concernant l'entretien technique",
    dueDate: "2025-10-20",
    completed: false,
    applicationId: "app-1",
    createdAt: "2025-10-17T10:00:00Z",
  },
  {
    id: "task-2",
    title: "Préparer portfolio",
    description:
      "Mettre à jour le portfolio avec les derniers projets pour DesignStudio",
    dueDate: "2025-10-18",
    completed: false,
    applicationId: "app-3",
    createdAt: "2025-10-17T10:00:00Z",
  },
  {
    id: "task-3",
    title: "Répondre à l'offre CloudSolutions",
    description: "Négocier le salaire et les conditions de télétravail",
    dueDate: "2025-10-19",
    completed: false,
    applicationId: "app-5",
    createdAt: "2025-10-16T10:00:00Z",
  },
];

export const sampleNotes: Note[] = [
  {
    id: "note-1",
    title: "Compétences à améliorer",
    content:
      "Après plusieurs entretiens, j'ai remarqué que Vue.js et TypeScript sont très demandés. Je devrais suivre une formation en ligne ce mois-ci.",
    tags: ["Développement", "Formation"],
    createdAt: "2025-10-15T10:00:00Z",
    updatedAt: "2025-10-15T10:00:00Z",
  },
  {
    id: "note-2",
    title: "Conseils d'un recruteur",
    content:
      "Important: toujours personnaliser la lettre de motivation. Mentionner des projets concrets et des résultats chiffrés. Les recruteurs apprécient les candidats qui montrent leur motivation.",
    tags: ["Conseils", "CV"],
    createdAt: "2025-10-12T10:00:00Z",
    updatedAt: "2025-10-12T10:00:00Z",
  },
  {
    id: "note-3",
    title: "Questions à poser en entretien",
    content:
      "- Quelle est la stack technique?\n- Comment l'équipe est-elle organisée?\n- Quelles sont les opportunités d'évolution?\n- Quelle est la culture d'entreprise?\n- Politique de télétravail?",
    tags: ["Entretien", "Priorité haute"],
    createdAt: "2025-10-10T10:00:00Z",
    updatedAt: "2025-10-14T10:00:00Z",
  },
];

export async function loadSampleData(database: any) {
  try {
    // Check if data already exists
    const existingApps = await database.getApplications();
    if (existingApps.length > 0) {
      return false; // Data already exists
    }

    // Import sample data
    await database.importData({
      applications: sampleApplications,
      tasks: sampleTasks,
      notes: sampleNotes,
    });

    return true;
  } catch (error) {
    console.error("Error loading sample data:", error);
    return false;
  }
}

import { Kanban, CheckCircle, BarChart3 } from "lucide-react";
import KanbanDemo from "../components/onboarding/KanbanDemo";
import TasksDemo from "../components/onboarding/TasksDemo";
import AnalyticsDemo from "../components/onboarding/AnalyticsDemo";

export const slides = [
  {
    title: "Suivez vos candidatures avec un Kanban",
    description:
      "Organisez toutes vos candidatures en un seul endroit. Glissez-déposez entre les colonnes pour mettre à jour leur statut instantanément.",
    icon: Kanban,
    gradient: "from-blue-400 to-blue-600",
    demo: KanbanDemo,
  },
  {
    title: "Ne manquez plus aucune échéance",
    description:
      "Créez des tâches et rappels pour chaque candidature. Restez organisé et suivez votre to-do list efficacement.",
    icon: CheckCircle,
    gradient: "from-green-400 to-green-600",
    demo: TasksDemo,
  },
  {
    title: "Analysez et optimisez votre recherche",
    description:
      "Visualisez vos statistiques en temps réel. Identifiez ce qui fonctionne et adaptez votre stratégie de recherche.",
    icon: BarChart3,
    gradient: "from-orange-400 to-orange-600",
    demo: AnalyticsDemo,
  },
];

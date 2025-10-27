import type { ApplicationStatus } from "../../types/index";
import type { Translation } from "./locales/fr";

export function getStatusLabel(
  status: ApplicationStatus,
  t: Translation,
): string {
  return t.statuses[status];
}

export function getStatusColor(status: ApplicationStatus): string {
  const colors: Record<ApplicationStatus, string> = {
    to_apply: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    sent: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    followed_up:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    interview:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return colors[status];
}

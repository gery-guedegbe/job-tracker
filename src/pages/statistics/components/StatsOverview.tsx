/**
 * StatsOverview.tsx
 * -----------------
 * Affiche 4 cartes résumant les principales métriques :
 * - Total des candidatures
 * - Candidatures envoyées
 * - Taux de réponse
 * - Temps de réponse moyen
 */

import { Card } from "../../../components/ui/Card";
import {
  CardHeader,
  CardContent,
  CardTitle,
} from "../../../components/ui/CardExtended";
import { FileText, CheckCircle, TrendingUp, Clock } from "lucide-react";
import type { Translation } from "../../../lib/i18n";

interface StatsOverviewProps {
  t: Translation;
  locale: string;
  totalApplications: number;
  sentApplications: number;
  responseRate: number;
  avgResponseTime: number;
}

export const StatsOverview = ({
  t,
  locale,
  totalApplications,
  sentApplications,
  responseRate,
  avgResponseTime,
}: StatsOverviewProps) => {
  const metrics = [
    {
      title: t.dashboard.metrics.totalApplications,
      value: totalApplications,
      icon: FileText,
      subtitle: t.common.all,
    },
    {
      title: t.statuses.sent,
      value: sentApplications,
      icon: CheckCircle,
      subtitle: t.statuses.sent,
    },
    {
      title: t.dashboard.metrics.responseRate,
      value: `${responseRate}%`,
      icon: TrendingUp,
      subtitle: t.dashboard.metrics.interviews,
    },
    {
      title: locale === "fr" ? "Temps de réponse" : "Response time",
      value: avgResponseTime,
      icon: Clock,
      subtitle: locale === "fr" ? "jours" : "days",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>

            <metric.icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold">{metric.value}</div>

            <p className="text-muted-foreground mt-1 text-xs">
              {metric.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

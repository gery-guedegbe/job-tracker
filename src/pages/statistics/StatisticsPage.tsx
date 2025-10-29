/**
 * StatisticsPage.tsx
 * ------------------
 * Page principale affichant les statistiques de candidatures :
 * - Aperçu global (cartes)
 * - Répartition par statut (camembert)
 * - Tendance mensuelle (barres)
 *
 * Logique métier centralisée ici, UI déléguée à des sous-composants.
 */

import { useTranslation } from "../../lib/i18n";
import { STATUS_CONFIG, type Application } from "../../types";
import { EmptyState } from "./components/EmptyState";
import { MonthlyTrendChart } from "./components/MonthlyTrendChart";
import { StatsOverview } from "./components/StatsOverview";
import { StatusDistributionChart } from "./components/StatusDistributionChart";

interface StatisticsPageProps {
  applications: Application[];
}

export function StatisticsPage({ applications }: StatisticsPageProps) {
  const { t, locale } = useTranslation();

  /** --- Calcul des statistiques globales --- */
  const totalApplications = applications.length;
  const sentApplications = applications.filter((app) =>
    ["sent", "followed_up", "interview", "offer"].includes(app.status),
  ).length;

  const responseRate =
    sentApplications > 0
      ? Math.round(
          (applications.filter((app) =>
            ["interview", "offer", "rejected"].includes(app.status),
          ).length /
            sentApplications) *
            100,
        )
      : 0;

  /** --- Temps moyen de réponse --- */
  const responseTimes = applications
    .filter((app) => ["interview", "offer"].includes(app.status))
    .map((app) => {
      const appDate = new Date(app.applicationDate);
      const now = new Date();
      return Math.floor(
        (now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24),
      );
    });

  const avgResponseTime =
    responseTimes.length > 0
      ? Math.round(
          responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
        )
      : 0;

  /** --- Données pour les graphiques --- */
  const statusData = Object.keys(STATUS_CONFIG)
    .map((status) => ({
      name: t.statuses[status as keyof typeof t.statuses],
      value: applications.filter((app) => app.status === status).length,
    }))
    .filter((item) => item.value > 0);

  const monthlyData = applications.reduce(
    (acc: Record<string, number>, app) => {
      const month = new Date(app.applicationDate).toLocaleDateString(locale, {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {},
  );

  const barChartData = Object.entries(monthlyData)
    .map(([month, count]) => ({
      month,
      [t.dashboard.charts.applicationsPerMonth]: count,
    }))
    .slice(-6);

  /** --- Rendu --- */
  return (
    <div className="container mx-auto space-y-6 p-8">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">{t.dashboard.title}</h2>
        <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
      </div>

      {/* Aperçu global */}
      <StatsOverview
        t={t}
        locale={locale}
        totalApplications={totalApplications}
        sentApplications={sentApplications}
        responseRate={responseRate}
        avgResponseTime={avgResponseTime}
      />

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatusDistributionChart t={t} data={statusData} />
        <MonthlyTrendChart t={t} data={barChartData} />
      </div>

      {/* État vide */}
      {applications.length === 0 && <EmptyState t={t} />}
    </div>
  );
}

export default StatisticsPage;

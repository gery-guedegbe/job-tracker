import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { useTranslation } from "../../lib/i18n";
import { STATUS_CONFIG, type Application } from "../../types";
import { Card } from "../../components/ui/Card";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/CardExtended";

interface StatisticsPageProps {
  applications: Application[];
}

function StatisticsPage({ applications }: StatisticsPageProps) {
  const { t, locale } = useTranslation();

  // Statistics
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

  // Status distribution for pie chart
  const statusData = Object.keys(STATUS_CONFIG)
    .map((status) => ({
      name: t.statuses[status as keyof typeof t.statuses],
      value: applications.filter((app) => app.status === status).length,
    }))
    .filter((item) => item.value > 0);

  const COLORS = [
    "#9CA3AF",
    "#3B82F6",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
  ];

  // Applications per month for bar chart
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

  // Average response time
  const responseTimes = applications
    .filter((app) => app.status === "interview" || app.status === "offer")
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

  return (
    <div className="container mx-auto space-y-6 p-8">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">{t.dashboard.title}</h2>
        <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.dashboard.metrics.totalApplications}
            </CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold">{totalApplications}</div>
            <p className="text-muted-foreground mt-1 text-xs">{t.common.all}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.statuses.sent}
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{sentApplications}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {t.statuses.sent}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.dashboard.metrics.responseRate}
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{responseRate}%</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {t.dashboard.metrics.interviews}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === "fr" ? "Temps de réponse" : "Response time"}
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{avgResponseTime}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {locale === "fr" ? "jours" : "days"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.charts.statusDistribution}</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                {t.dashboard.emptyState}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.charts.monthlyTrend}</CardTitle>
          </CardHeader>
          <CardContent>
            {barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey={t.dashboard.charts.applicationsPerMonth}
                    fill="#3B82F6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                {t.dashboard.emptyState}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {applications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">
              {t.dashboard.emptyState}
            </h3>
            <p className="text-muted-foreground">
              {t.dashboard.emptyStateDescription}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default StatisticsPage;

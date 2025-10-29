/**
 * MonthlyTrendChart.tsx
 * ----------------------
 * Graphique en barres montrant les candidatures par mois.
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/CardExtended";
import type { Translation } from "../../../lib/i18n";
import { Card } from "../../../components/ui/Card";

interface MonthlyTrendChartProps {
  t: Translation;
  data: any[];
}

export const MonthlyTrendChart = ({ t, data }: MonthlyTrendChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{t.dashboard.charts.monthlyTrend}</CardTitle>
    </CardHeader>

    <CardContent>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
);

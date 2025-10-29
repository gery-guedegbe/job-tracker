/**
 * StatusDistributionChart.tsx
 * ----------------------------
 * Graphique en camembert (PieChart) montrant la répartition
 * des candidatures par statut.
 */

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/CardExtended";
import type { Translation } from "../../../lib/i18n";
import { Card } from "../../../components/ui/Card";

type CustomPieLabel = {
  name?: string;
  percent?: number;
};

interface StatusDistributionChartProps {
  t: Translation;
  data: { name: string; value: number }[];
}

const COLORS = [
  "#9CA3AF",
  "#3B82F6",
  "#8B5CF6",
  "#F59E0B",
  "#10B981",
  "#EF4444",
];

/**
 * Fonction séparée pour générer le label du graphique
 * On utilise `any` pour éviter le conflit de typage entre Recharts et TS.
 */
const renderCustomizedLabel = (props: CustomPieLabel) => {
  const { name, percent } = props;
  return `${name} (${(percent! * 100).toFixed(0)}%)`;
};

export const StatusDistributionChart = ({
  t,
  data,
}: StatusDistributionChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{t.dashboard.charts.statusDistribution}</CardTitle>
    </CardHeader>

    <CardContent>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // ✅ Utilisation de la fonction nommée, typée de manière sûre
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
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
);

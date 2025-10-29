# Statistics Module — JobTrackr

## Structure

statistics/
├── StatisticsPage.tsx # Page principale orchestrant les données et les sous-composants
└── components/
├── StatsOverview.tsx # Aperçu global (cartes de résumé)
├── StatusDistributionChart.tsx # Graphique camembert
├── MonthlyTrendChart.tsx # Graphique en barres
└── EmptyState.tsx # État vide

---

## bjectif

Ce module gère l'affichage des statistiques de candidatures (Dashboard).  
Il illustre la **capacité à structurer un front-end modulaire**, séparer la logique métier et les composants UI, et maintenir un code **scalable et lisible**.

---

## Logique principale

- Les calculs (taux de réponse, moyenne de jours, etc.) se trouvent **dans `StatisticsPage.tsx`**.
- Les composants enfants sont **purement visuels**.
- Les graphiques utilisent la librairie **`Recharts`**, optimisée pour le responsive.

---

## Détails des composants

| Composant                 | Rôle                             | Particularité                                |
| ------------------------- | -------------------------------- | -------------------------------------------- |
| `StatsOverview`           | Affiche les 4 cartes principales | Reçoit les métriques calculées               |
| `StatusDistributionChart` | Répartition par statut           | Utilise un PieChart avec couleurs dynamiques |
| `MonthlyTrendChart`       | Tendances mensuelles             | Affiche les candidatures/mois                |
| `EmptyState`              | État vide                        | Utilisé si aucune donnée n’est disponible    |

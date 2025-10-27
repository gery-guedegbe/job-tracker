import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { CardContent } from "../../components/ui/CardExtended";
import { useTranslation, getStatusLabel } from "../../lib/i18n";
import { ApplicationCard } from "../../components/ApplicationCard";
import type { Application, ApplicationStatus } from "../../types/index";

interface KanbanViewPageProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onAdd: () => void;
}

const KanbanViewPage = ({
  applications,
  onEdit,
  onDelete,
  onStatusChange,
  onAdd,
}: KanbanViewPageProps) => {
  const [dragOverColumn, setDragOverColumn] =
    useState<ApplicationStatus | null>(null);
  const { t } = useTranslation();
  const columns: ApplicationStatus[] = [
    "to_apply",
    "sent",
    "followed_up",
    "interview",
    "offer",
    "rejected",
  ];

  const handleDrop = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    const applicationId = e.dataTransfer.getData("applicationId");
    if (applicationId) {
      onStatusChange(applicationId, status);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (status: ApplicationStatus) => {
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  if (applications.length === 0) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Plus className="text-primary h-8 w-8" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">{t.list.emptyState}</h3>

            <p className="text-muted-foreground mb-6">
              {t.list.emptyStateDescription}
            </p>

            <Button onClick={onAdd} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              {t.kanban.addApplication}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] p-4">
      <div className="scrollbar-hide flex h-full gap-4 overflow-x-auto pb-4">
        {columns.map((status) => {
          const columnApps = applications.filter(
            (app) => app.status === status,
          );
          const isDragOver = dragOverColumn === status;

          return (
            <div
              key={status}
              className={`flex w-80 flex-shrink-0 flex-col rounded-lg p-4 transition-colors ${
                isDragOver ? "bg-primary/10 ring-primary ring-2" : "bg-muted/30"
              }`}
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(status)}
              onDragLeave={handleDragLeave}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{getStatusLabel(status, t)}</h3>
                  <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-sm">
                    {columnApps.length}
                  </span>
                </div>
              </div>

              <ScrollArea className="flex-1 pr-2">
                <div className="space-y-3">
                  {columnApps.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
                  {columnApps.length === 0 && (
                    <div className="text-muted-foreground py-8 text-center text-sm">
                      {t.kanban.emptyColumn}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onAdd}
        size="lg"
        className="fixed right-8 bottom-8 h-14 w-14 rounded-full shadow-lg transition-shadow hover:shadow-xl"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default KanbanViewPage;

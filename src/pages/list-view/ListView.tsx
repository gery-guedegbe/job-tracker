import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import {
  type Application,
  STATUS_CONFIG,
  type ApplicationStatus,
} from "../../types/index";
import { useTranslation } from "../../lib/i18n";
import { Input } from "../../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/AlertDialog";

interface ListViewProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function ListView({
  applications,
  onEdit,
  onDelete,
  onAdd,
}: ListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [deleteDialogAppId, setDeleteDialogAppId] = useState<string | null>(
    null,
  );
  const { t, locale } = useTranslation();

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto h-[calc(100vh-190px)] space-y-6 overflow-hidden p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full flex-1 md:max-w-md">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />

          <Input
            placeholder={t.list.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 pl-10"
          />
        </div>

        <div className="flex w-full gap-2 md:w-auto">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as ApplicationStatus | "all")
            }
          >
            <SelectTrigger className="h-11 w-full md:w-[200px]">
              <SelectValue placeholder={t.list.filterByStatus} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">{t.common.all}</SelectItem>
              {Object.entries(STATUS_CONFIG).map(([key]) => (
                <SelectItem key={key} value={key}>
                  {t.statuses[key as keyof typeof t.statuses]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={onAdd} className="h-11 flex-shrink-0 gap-2 px-6">
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">{t.common.add}</span>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.list.columns.jobTitle}</TableHead>
              <TableHead>{t.list.columns.company}</TableHead>
              <TableHead>{t.list.columns.status}</TableHead>
              <TableHead>{t.list.columns.applicationDate}</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">
                {t.list.columns.actions}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground py-8 text-center"
                >
                  {t.list.emptyState}
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.jobTitle}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>
                    <Badge className={STATUS_CONFIG[app.status].color}>
                      {t.statuses[app.status]}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(app.applicationDate).toLocaleDateString(locale)}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {app.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {app.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{app.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(app);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteDialogAppId(app.id);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground text-sm">
        {filteredApplications.length}{" "}
        {filteredApplications.length !== 1
          ? t.list.emptyState.toLowerCase()
          : t.list.emptyState.toLowerCase().slice(0, -1)}
      </div>

      {/* Delete confirmation dialog - rendered once outside the table */}
      <AlertDialog
        open={deleteDialogAppId !== null}
        onOpenChange={(open) => !open && setDeleteDialogAppId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.modal.deleteConfirm.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.modal.deleteConfirm.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteDialogAppId) {
                  onDelete(deleteDialogAppId);
                  setDeleteDialogAppId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ListView;

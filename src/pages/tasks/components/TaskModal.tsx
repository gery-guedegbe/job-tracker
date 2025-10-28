import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/Dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Textarea } from "../../../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import type { Application, TaskFormData } from "../../../types";
import type { Translation } from "../../../lib/i18n";

/**
 * TaskModal
 * Modal d’ajout ou d’édition d’une tâche.
 */
export const TaskModal = ({
  t,
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  applications,
}: {
  t: Translation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: TaskFormData;
  setFormData: (formData: TaskFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  applications: Application[];
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t.taskModal.add.title}</DialogTitle>
        <DialogDescription>{t.taskModal.add.description}</DialogDescription>
      </DialogHeader>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {/* Titre */}
        <div className="space-y-2">
          <Label htmlFor="title">{t.taskModal.fields.title.label} *</Label>

          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder={t.taskModal.fields.title.placeholder}
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            {t.taskModal.fields.description.label}
          </Label>

          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder={t.taskModal.fields.description.placeholder}
            rows={3}
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="dueDate">{t.taskModal.fields.dueDate.label} *</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            required
          />
        </div>

        {/* Application liée */}
        <div className="space-y-2">
          <Label htmlFor="application">
            {t.taskModal.fields.linkedApplication.label}
          </Label>
          <Select
            value={formData.applicationId || "none"}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                applicationId: value === "none" ? "" : value,
              })
            }
          >
            <SelectTrigger id="application">
              <SelectValue
                placeholder={t.taskModal.fields.linkedApplication.placeholder}
              />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">
                {t.taskModal.fields.linkedApplication.none}
              </SelectItem>

              {applications.map((app) => (
                <SelectItem key={app.id} value={app.id}>
                  {app.jobTitle} - {app.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.common.cancel}
          </Button>
          <Button>{t.common.add}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);

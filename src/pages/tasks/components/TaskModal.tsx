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
import {
  Briefcase,
  CalendarIcon,
  CheckCircle,
  FileText,
  X,
} from "lucide-react";

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
    <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden sm:max-h-[85vh]">
      {/* Header - Fixed */}
      <DialogHeader className="flex-shrink-0 border-b pb-3 sm:pb-4">
        <div className="flex items-start justify-between px-4 sm:px-6">
          <div className="flex-1 pr-2">
            <DialogTitle className="text-lg sm:text-xl">
              {t.taskModal.add.title}
            </DialogTitle>

            <DialogDescription className="mt-1 text-xs sm:mt-1.5 sm:text-sm">
              {t.taskModal.add.description}
            </DialogDescription>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted ml-2 flex-shrink-0 rounded-lg p-1.5 transition-colors sm:ml-4 sm:p-2"
            aria-label="Fermer"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </DialogHeader>

      {/* Form Content - Scrollable */}
      <form
        onSubmit={onSubmit}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <CheckCircle className="text-primary h-4 w-4" />
              {t.taskModal.fields.title.label}
              <span className="text-destructive">*</span>
            </Label>

            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder={t.taskModal.fields.title.placeholder}
              required
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="text-primary h-4 w-4" />
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
              className="resize-none"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="flex items-center gap-2">
              <CalendarIcon className="text-primary h-4 w-4" />
              {t.taskModal.fields.dueDate.label}
              <span className="text-destructive">*</span>
            </Label>

            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              required
              className="h-11"
            />
          </div>

          {/* Linked Application */}
          <div className="space-y-2">
            <Label htmlFor="application" className="flex items-center gap-2">
              <Briefcase className="text-primary h-4 w-4" />
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
              <SelectTrigger id="application" className="h-11">
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
        </div>

        {/* Footer - Fixed */}
        <div className="bg-muted/20 flex flex-shrink-0 flex-col-reverse justify-end gap-3 border-t px-4 py-4 sm:flex-row sm:px-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 px-6"
          >
            {t.common.cancel}
          </Button>

          <Button className="h-11 px-8">{t.common.add}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);

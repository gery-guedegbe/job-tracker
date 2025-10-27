import { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  Building2,
  Calendar as CalendarIcon,
  Tag,
  FileText,
} from "lucide-react";
import {
  type Application,
  type ApplicationStatus,
  STATUS_CONFIG,
} from "../types/index";
import { useTranslation, getStatusLabel } from "../lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/Select";
import { Textarea } from "./ui/TextArea";
import { Button } from "./ui/button";
import { Badge } from "./ui/Badge";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (application: Application) => void;
  application?: Application | null;
}

export function ApplicationModal({
  isOpen,
  onClose,
  onSave,
  application,
}: ApplicationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Application>>({
    jobTitle: "",
    company: "",
    status: "to_apply",
    applicationDate: new Date().toISOString().split("T")[0],
    notes: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (application) {
      setFormData(application);
    } else {
      setFormData({
        jobTitle: "",
        company: "",
        status: "to_apply",
        applicationDate: new Date().toISOString().split("T")[0],
        notes: "",
        tags: [],
      });
      setTagInput("");
    }
  }, [application, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const newApplication: Application = {
      id: application?.id || `app-${Date.now()}`,
      jobTitle: formData.jobTitle || "",
      company: formData.company || "",
      status: (formData.status as ApplicationStatus) || "to_apply",
      applicationDate:
        formData.applicationDate || new Date().toISOString().split("T")[0],
      notes: formData.notes || "",
      tags: formData.tags || [],
      createdAt: application?.createdAt || now,
      updatedAt: now,
    };

    onSave(newApplication);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden sm:max-h-[85vh]">
        {/* Header - Fixed */}
        <DialogHeader className="flex-shrink-0 border-b pb-3 sm:pb-4">
          <div className="flex items-start justify-between px-4 sm:px-6">
            <div className="flex-1 pr-2">
              <DialogTitle className="text-lg sm:text-xl">
                {application ? t.modal.edit.title : t.modal.add.title}
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs sm:mt-1.5 sm:text-sm">
                {application
                  ? t.modal.edit.description
                  : t.modal.add.description}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-muted ml-2 flex-shrink-0 rounded-lg p-1.5 transition-colors sm:ml-4 sm:p-2"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Form Content - Scrollable */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
            {/* Job Title and Company - Grid on desktop, Stack on mobile */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="flex items-center gap-2">
                  <Briefcase className="text-primary h-4 w-4" />
                  {t.modal.fields.jobTitle.label}
                  <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  placeholder={t.modal.fields.jobTitle.placeholder}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="text-primary h-4 w-4" />
                  {t.modal.fields.company.label}
                  <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder={t.modal.fields.company.placeholder}
                  required
                  className="h-11"
                />
              </div>
            </div>

            {/* Status and Date - Grid on desktop, Stack on mobile */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="status">{t.modal.fields.status.label}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as ApplicationStatus,
                    })
                  }
                >
                  <SelectTrigger id="status" className="h-11">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            STATUS_CONFIG[formData.status as ApplicationStatus]
                              ?.color || "#9CA3AF",
                        }}
                      />

                      <span className="truncate">
                        {getStatusLabel(
                          formData.status as ApplicationStatus,
                          t,
                        )}
                      </span>
                    </div>
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: config.color }}
                          />
                          {getStatusLabel(key as ApplicationStatus, t)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="applicationDate"
                  className="flex items-center gap-2"
                >
                  <CalendarIcon className="text-primary h-4 w-4" />
                  {t.modal.fields.applicationDate.label}
                </Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicationDate: e.target.value,
                    })
                  }
                  className="h-11"
                />
              </div>
            </div>

            {/* Notes - Full width */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="text-primary h-4 w-4" />
                {t.modal.fields.notes.label}
              </Label>

              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder={t.modal.fields.notes.placeholder}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Tags - Full width */}
            <div className="space-y-3">
              <Label htmlFor="tags" className="flex items-center gap-2">
                <Tag className="text-primary h-4 w-4" />
                {t.modal.fields.tags.label}
              </Label>

              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder={t.modal.fields.tags.placeholder}
                  className="h-11 flex-1"
                />

                <Button
                  onClick={addTag}
                  variant="secondary"
                  className="h-11 flex-shrink-0 px-6"
                >
                  {t.common.add}
                </Button>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div className="bg-muted/30 border-border flex flex-wrap gap-2 rounded-lg border p-3">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-1.5 py-1.5 pr-2 pl-3"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-destructive/20 hover:text-destructive ml-0.5 rounded-sm p-0.5 transition-colors"
                        aria-label={`Supprimer ${tag}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="bg-muted/20 flex flex-shrink-0 flex-col-reverse justify-end gap-3 border-t px-4 py-4 sm:flex-row sm:px-6">
            <Button variant="outline" onClick={onClose} className="h-11 px-6">
              {t.common.cancel}
            </Button>

            <Button className="h-11 px-8">
              {application ? t.common.edit : t.common.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

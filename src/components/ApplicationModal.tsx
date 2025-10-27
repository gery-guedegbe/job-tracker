import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type {
  Application,
  ApplicationStatus,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
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
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {application ? t.modal.edit.title : t.modal.add.title}
          </DialogTitle>
          <DialogDescription>
            {application ? t.modal.edit.description : t.modal.add.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">
                {t.modal.fields.jobTitle.label} *
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
                placeholder={t.modal.fields.jobTitle.placeholder}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">{t.modal.fields.company.label} *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder={t.modal.fields.company.placeholder}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {getStatusLabel(key as ApplicationStatus, t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationDate">
                {t.modal.fields.applicationDate.label}
              </Label>
              <Input
                id="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={(e) =>
                  setFormData({ ...formData, applicationDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t.modal.fields.notes.label}</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder={t.modal.fields.notes.placeholder}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">{t.modal.fields.tags.label}</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder={t.modal.fields.tags.placeholder}
              />

              <Button onClick={addTag} variant="secondary">
                {t.common.add}
              </Button>
            </div>

            {formData.tags && formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              {t.common.cancel}
            </Button>

            <Button>{application ? t.common.edit : t.common.save}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

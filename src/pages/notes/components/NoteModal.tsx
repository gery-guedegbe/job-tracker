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
import { Badge } from "../../../components/ui/Badge";
import { X, StickyNote, FileText, TagIcon } from "lucide-react";

interface NoteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingNote: any | null;
  formData: {
    title: string;
    content: string;
    tags: string[];
  };
  tagInput: string;
  setFormData: (data: any) => void;
  setTagInput: (value: string) => void;
  onAddTag: (e: React.FormEvent) => void;
  onRemoveTag: (tag: string) => void;
  onSave: (e: React.FormEvent) => void;
  t: any;
}

export function NoteModal({
  isOpen,
  onOpenChange,
  editingNote,
  formData,
  tagInput,
  setFormData,
  setTagInput,
  onAddTag,
  onRemoveTag,
  onSave,
  t,
}: NoteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden sm:max-h-[85vh]">
        {/* Header - Fixed */}
        <DialogHeader className="flex-shrink-0 border-b pb-3 sm:pb-4">
          <div className="flex items-start justify-between px-4 sm:px-6">
            <div className="flex-1 pr-2">
              <DialogTitle className="text-lg sm:text-xl">
                {editingNote ? t.noteModal.edit.title : t.noteModal.add.title}
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs sm:mt-1.5 sm:text-sm">
                {editingNote
                  ? t.noteModal.edit.description
                  : t.noteModal.add.description}
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
          onSubmit={onSave}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <StickyNote className="text-primary h-4 w-4" />
                {t.noteModal.fields.title.label}
              </Label>

              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder={t.noteModal.fields.title.placeholder}
                className="h-11"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="flex items-center gap-2">
                <FileText className="text-primary h-4 w-4" />
                {t.noteModal.fields.content.required}
                <span className="text-destructive">*</span>
              </Label>

              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder={t.noteModal.fields.content.placeholder}
                rows={8}
                required
                className="min-h-[200px] resize-none"
              />
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label htmlFor="tags" className="flex items-center gap-2">
                <TagIcon className="text-primary h-4 w-4" />
                {t.noteModal.fields.tags.label}
              </Label>

              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onAddTag(e);
                    }
                  }}
                  placeholder={t.noteModal.fields.tags.placeholder}
                  className="h-11 flex-1"
                />

                <Button
                  onClick={onAddTag}
                  variant="secondary"
                  className="h-11 flex-shrink-0 px-6"
                >
                  {t.noteModal.fields.tags.add}
                </Button>
              </div>

              {formData.tags.length > 0 && (
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
                        onClick={() => onRemoveTag(tag)}
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
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 px-6"
            >
              {t.common.cancel}
            </Button>

            <Button className="h-11 px-8">
              {editingNote ? t.noteModal.update : t.noteModal.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

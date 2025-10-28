import { db } from "../../lib/db";
import toast from "react-hot-toast";
import type { Note } from "../../types";
import { useState, useEffect } from "react";
import { useTranslation } from "../../lib/i18n";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  X,
  StickyNote,
  FileText,
  TagIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { CardContent, CardHeader } from "../../components/ui/CardExtended";
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
import { Badge } from "../../components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/TextArea";

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteDialogNoteId, setDeleteDialogNoteId] = useState<string | null>(
    null,
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const { t, locale } = useTranslation();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const loadedNotes = await db.getNotes();
      setNotes(
        loadedNotes.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        ),
      );
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const handleOpenModal = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setFormData({
        title: note.title,
        content: note.content,
        tags: note.tags,
      });
    } else {
      setEditingNote(null);
      setFormData({ title: "", content: "", tags: [] });
      setTagInput("");
    }
    setIsModalOpen(true);
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      if (editingNote) {
        const updatedNote: Note = {
          ...editingNote,
          ...formData,
          updatedAt: now,
        };
        await db.updateNote(updatedNote);
        toast.success(t.toast.success.noteUpdated);
      } else {
        const newNote: Note = {
          id: `note-${Date.now()}`,
          ...formData,
          createdAt: now,
          updatedAt: now,
        };
        await db.addNote(newNote);
        toast.success(t.toast.success.noteAdded);
      }
      await loadNotes();
      setIsModalOpen(false);
      setFormData({ title: "", content: "", tags: [] });
    } catch (error) {
      toast.error(t.toast.error.saveNote);
      console.error(error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await db.deleteNote(id);
      await loadNotes();
      setDeleteDialogNoteId(null);
      toast.success(t.toast.success.noteDeleted);
    } catch (error) {
      toast.error(t.toast.error.deleteNote);
      console.error(error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="container mx-auto h-[calc(100vh-120px)] max-w-6xl space-y-6 p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">{t.notes.title}</h2>
          <p className="text-muted-foreground">{t.notes.subtitle}</p>
        </div>

        <Button onClick={() => handleOpenModal()} className="h-11 gap-2">
          <Plus className="h-4 w-4" />
          {t.notes.addNote}
        </Button>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
        <Input
          placeholder={t.notes.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 pl-10"
        />
      </div>

      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <StickyNote className="text-primary h-8 w-8" />
            </div>

            <h3 className="mb-2 text-lg font-semibold">
              {notes.length === 0
                ? t.notes.emptyState
                : t.notes.noSearchResults}
            </h3>

            <p className="text-muted-foreground mb-4">
              {notes.length === 0
                ? t.notes.emptyStateDescription
                : t.notes.tryDifferentKeywords}
            </p>
            {notes.length === 0 && (
              <Button onClick={() => handleOpenModal()} className="h-11 gap-2">
                <Plus className="h-4 w-4" />
                {t.notes.addNote}
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="group transition-shadow hover:shadow-lg"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 font-semibold">
                    {note.title || t.notes.untitledNote}
                  </h3>

                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(note);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteDialogNoteId(note.id);
                      }}
                      className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-muted-foreground line-clamp-4 text-sm">
                  {note.content}
                </p>

                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-muted-foreground text-xs">
                  {new Date(note.updatedAt).toLocaleDateString(
                    locale === "fr" ? "fr-FR" : "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Note Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-muted ml-2 flex-shrink-0 rounded-lg p-1.5 transition-colors sm:ml-4 sm:p-2"
                aria-label="Fermer"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </DialogHeader>

          {/* Form Content - Scrollable */}
          <form
            onSubmit={handleSaveNote}
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
                        addTag();
                      }
                    }}
                    placeholder={t.noteModal.fields.tags.placeholder}
                    className="h-11 flex-1"
                  />
                  <Button
                    onClick={addTag}
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
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialogNoteId !== null}
        onOpenChange={(open) => !open && setDeleteDialogNoteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t.noteModal.deleteConfirm.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t.noteModal.deleteConfirm.description}{" "}
              <strong>
                {notes.find((n) => n.id === deleteDialogNoteId)?.title ||
                  t.notes.untitledNote}
              </strong>
              {t.noteModal.deleteConfirm.descriptionSuffix}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t.noteModal.deleteConfirm.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteDialogNoteId) {
                  handleDeleteNote(deleteDialogNoteId);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.noteModal.deleteConfirm.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default NotesPage;

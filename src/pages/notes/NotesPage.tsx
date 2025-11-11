import { useState, useEffect } from "react";
import { db } from "../../lib/db";
import toast from "react-hot-toast";
import type { Note } from "../../types";
import { useTranslation } from "../../lib/i18n";

import { NotesHeader } from "./components/NotesHeader";
import { NotesSearchBar } from "./components/NotesSearchBar";
import { NotesEmptyState } from "./components/NotesEmptyState";
import { NoteCard } from "./components/NoteCard";
import { NoteModal } from "./components/NoteModal";
import { DeleteNoteDialog } from "./components/DeleteNoteDialog";

function NotesPage() {
  const { t, locale } = useTranslation();

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

  // Charger les notes
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

  // Ouvrir la modale d’ajout / édition
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

  // Sauvegarder ou mettre à jour une note
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

  // Supprimer une note
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

  // Ajouter ou retirer un tag
  const addTag = (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="container mx-auto max-w-6xl space-y-6 p-4 lg:p-6">
      {/* En-tête */}
      <NotesHeader
        title={t.notes.title}
        subtitle={t.notes.subtitle}
        onAdd={() => handleOpenModal()}
      />

      {/* Recherche */}
      <NotesSearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t.notes.searchPlaceholder}
      />

      {/* Liste ou État vide */}
      {filteredNotes.length === 0 ? (
        <NotesEmptyState
          isCompletelyEmpty={notes.length === 0}
          title={
            notes.length === 0 ? t.notes.emptyState : t.notes.noSearchResults
          }
          description={
            notes.length === 0
              ? t.notes.emptyStateDescription
              : t.notes.tryDifferentKeywords
          }
          addLabel={t.notes.addNote}
          onAdd={() => handleOpenModal()}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              locale={locale === "fr" ? "fr-FR" : "en-US"}
              onEdit={handleOpenModal}
              onDelete={(id: string) => setDeleteDialogNoteId(id)}
            />
          ))}
        </div>
      )}

      {/* Modal Add/Edit */}
      <NoteModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingNote={editingNote}
        formData={formData}
        tagInput={tagInput}
        setFormData={setFormData}
        setTagInput={setTagInput}
        onAddTag={addTag}
        onRemoveTag={removeTag}
        onSave={handleSaveNote}
        t={t}
      />

      {/* Dialog suppression */}
      <DeleteNoteDialog
        open={deleteDialogNoteId !== null}
        noteTitle={
          notes.find((n) => n.id === deleteDialogNoteId)?.title ||
          t.notes.untitledNote
        }
        onClose={() => setDeleteDialogNoteId(null)}
        onConfirm={() =>
          deleteDialogNoteId && handleDeleteNote(deleteDialogNoteId)
        }
        t={t}
      />
    </div>
  );
}

export default NotesPage;

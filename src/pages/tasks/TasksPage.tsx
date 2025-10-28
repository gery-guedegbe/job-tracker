"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/db";
import toast from "react-hot-toast";
import type { Task, Application } from "../../types";
import { useTranslation } from "../../lib/i18n";

import { TasksHeader } from "./components/TasksHeader";
import { TasksEmptyState } from "./components/TasksEmptyState";
import { TaskSection } from "./components/TaskSection";
import { TaskModal } from "./components/TaskModal";

/**
 * TasksPage
 * Page principale de gestion des tâches :
 * - Orchestration de la logique : chargement, ajout, suppression, complétion
 * - Communication avec IndexedDB (via db)
 * - Gestion de l’état global des tâches
 */
export function TasksPage({ applications }: { applications: Application[] }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    applicationId: "",
  });
  const { t, locale } = useTranslation();

  // Chargement initial des tâches depuis la base locale
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Charge les tâches depuis IndexedDB
   * Trie les tâches par date d’échéance (plus proche → plus loin)
   */
  const loadTasks = async () => {
    try {
      const loadedTasks = await db.getTasks();
      setTasks(
        loadedTasks.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        ),
      );
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  /**
   * Ajoute une nouvelle tâche
   */
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        completed: false,
        applicationId: formData.applicationId || undefined,
        createdAt: new Date().toISOString(),
      };
      await db.addTask(newTask);
      await loadTasks();
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        applicationId: "",
      });
      toast.success(t.toast.success.taskAdded);
    } catch (error) {
      toast.error(t.toast.error.saveTask);
      console.error(error);
    }
  };

  /**
   * Change l’état (complétée / non complétée)
   */
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await db.updateTask({ id, completed: !completed });
      await loadTasks();
      toast.success(completed ? t.tasks.markIncomplete : t.tasks.markComplete);
    } catch (error) {
      toast.error(t.toast.error.saveTask);
      console.error(error);
    }
  };

  /**
   * Supprime une tâche
   */
  const handleDeleteTask = async (id: string) => {
    try {
      await db.deleteTask(id);
      await loadTasks();
      toast.success(t.toast.success.taskDeleted);
    } catch (error) {
      toast.error(t.toast.error.deleteTask);
      console.error(error);
    }
  };

  /**
   * Regroupe les tâches par période (aujourd’hui, cette semaine, etc.)
   */
  const getTasksBySection = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return {
      today: tasks.filter(
        (t) => !t.completed && new Date(t.dueDate) <= tomorrow,
      ),
      thisWeek: tasks.filter(
        (t) =>
          !t.completed &&
          new Date(t.dueDate) > tomorrow &&
          new Date(t.dueDate) <= nextWeek,
      ),
      later: tasks.filter(
        (t) => !t.completed && new Date(t.dueDate) > nextWeek,
      ),
      completed: tasks.filter((t) => t.completed),
    };
  };

  const sections = getTasksBySection();

  /**
   * Trouve l’application liée à une tâche (si existe)
   */
  const getLinkedApplication = (applicationId?: string) =>
    applicationId ? applications.find((app) => app.id === applicationId) : null;

  return (
    <div className="container mx-auto max-w-5xl space-y-6 p-8">
      {/* En-tête */}
      <TasksHeader t={t} onAddTask={() => setIsModalOpen(true)} />

      {/* Contenu */}
      {tasks.length === 0 ? (
        <TasksEmptyState t={t} onAddTask={() => setIsModalOpen(true)} />
      ) : (
        <div className="space-y-6">
          <TaskSection
            title={t.tasks.sections.today}
            tasks={sections.today}
            t={t}
            locale={locale}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            getLinkedApplication={getLinkedApplication}
          />

          <TaskSection
            title={t.tasks.sections.thisWeek}
            tasks={sections.thisWeek}
            t={t}
            locale={locale}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            getLinkedApplication={getLinkedApplication}
          />

          <TaskSection
            title={t.tasks.sections.later}
            tasks={sections.later}
            t={t}
            locale={locale}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            getLinkedApplication={getLinkedApplication}
          />

          <TaskSection
            title={t.tasks.sections.completed}
            tasks={sections.completed}
            t={t}
            locale={locale}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            getLinkedApplication={getLinkedApplication}
          />
        </div>
      )}

      {/* Modal d’ajout de tâche */}
      <TaskModal
        t={t}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddTask}
        applications={applications}
      />
    </div>
  );
}

export default TasksPage;

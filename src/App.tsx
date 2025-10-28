/**
 * App.tsx
 * --------------------
 * Point d'entrée principal de l'application JobTrackr.
 * - Initialise la base locale (IndexedDB)
 * - Gère les paramètres utilisateur (langue, thème, etc.)
 * - Charge les données (applications, tâches, etc.)
 * - Configure le routage global (onboarding + dashboard)
 * - Fournit le contexte d’internationalisation (i18n)
 */

import { db } from "./lib/db";
import type { Application, ApplicationStatus, AppSettings } from "./types";
import { useEffect, useState } from "react";
import { loadSampleData } from "./lib/sample-data";
import toast, { Toaster } from "react-hot-toast";
import { I18nProvider } from "./lib/i18n";
import { fr } from "./lib/i18n/locales/fr";
import { en } from "./lib/i18n/locales/en";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import KanbanViewPage from "./pages/kanban-view/KanbanViewPage";
import ListView from "./pages/list-view/ListView";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import TasksPage from "./pages/tasks/TasksPage";
import NotesPage from "./pages/notes/NotesPage";
import ImportExportPage from "./pages/import_export/ImportExportPage";
import SettingsPage from "./pages/settings/SettingsPage";
import { ApplicationModal } from "./components/ApplicationModal";

/**
 * Composant racine de l’application.
 * Gère :
 *  - l’initialisation des données
 *  - la configuration des thèmes
 *  - l’état du tutoriel (onboarding)
 *  - la navigation principale via React Router
 */
const App = () => {
  // --- États globaux de l’application ---
  // Indique si l’application est prête à être affichée (IndexedDB initialisée)
  const [isInitialized, setIsInitialized] = useState(false);

  // Contient les préférences utilisateur (thème, langue, etc.)
  const [settings, setSettings] = useState<AppSettings>({
    theme: "light",
    language: "fr",
    autoSave: true,
    onboardingCompleted: false,
  });

  // Contient la liste des candidatures (chargées depuis IndexedDB)
  const [applications, setApplications] = useState<Application[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);

  /**
   * useEffect : Initialisation de l’application.
   * - Initialise la base IndexedDB
   * - Charge les paramètres utilisateur
   * - Applique le thème (dark/light)
   * - Charge les candidatures existantes
   */
  useEffect(() => {
    const initApp = async () => {
      try {
        await db.init(); // Initialisation de la base locale
        const loadedSettings = await db.getSettings();
        setSettings(loadedSettings);

        // Application du thème stocké dans les paramètres
        if (loadedSettings.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        // Chargement initial des données utilisateur
        await loadApplications();

        // Marque l’app comme prête
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing app:", error);
        toast.error("Erreur lors de l'initialisation de l'application");
      }
    };

    initApp();
  }, []);

  /**
   * Charge toutes les candidatures depuis la base IndexedDB
   * et met à jour l’état global `applications`.
   */
  const loadApplications = async () => {
    try {
      const loadedApps = await db.getApplications();
      setApplications(loadedApps);
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);

    // Apply theme immediately
    if (newSettings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  /**
   * Callback appelé à la fin de l’onboarding (introduction interactive).
   * - Marque l’onboarding comme terminé
   * - Met à jour les paramètres utilisateur
   * - Charge éventuellement des données d’exemple
   */
  const handleCompleteOnboarding = async (shouldLoadSampleData: boolean) => {
    const newSettings = { ...settings, onboardingCompleted: true };
    setSettings(newSettings);
    await db.updateSettings(newSettings);

    // Si l’utilisateur souhaite charger des données de démonstration
    if (shouldLoadSampleData) {
      const loaded = await loadSampleData(db);
      if (loaded) {
        await loadApplications();
        toast.success("Données d'exemple chargées avec succès !");
      }
    }
  };

  const handleAddApplication = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleSaveApplication = async (application: Application) => {
    try {
      const t = settings.language === "fr" ? fr : en;
      if (editingApplication) {
        await db.updateApplication(application);
        toast.success(t.toast.success.applicationUpdated);
      } else {
        await db.addApplication(application);
        toast.success(t.toast.success.applicationAdded);
      }
      await loadApplications();
    } catch (error) {
      const t = settings.language === "fr" ? fr : en;
      toast.error(t.toast.error.saveApplication);
      console.error(error);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      const t = settings.language === "fr" ? fr : en;
      await db.deleteApplication(id);
      await loadApplications();
      toast.success(t.toast.success.applicationDeleted);
    } catch (error) {
      const t = settings.language === "fr" ? fr : en;
      toast.error(t.toast.error.deleteApplication);
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    try {
      const t = settings.language === "fr" ? fr : en;
      const application = applications.find((app) => app.id === id);
      if (application) {
        const updatedApp = {
          ...application,
          status,
          updatedAt: new Date().toISOString(),
        };
        await db.updateApplication(updatedApp);
        await loadApplications();
        toast.success(t.toast.success.statusUpdated);
      }
    } catch (error) {
      const t = settings.language === "fr" ? fr : en;
      toast.error(t.toast.error.updateStatus);
      console.error(error);
    }
  };

  /**
   * --- ÉTAPE 1 : Affichage du splash screen de chargement ---
   * Affiche un spinner pendant l’initialisation de la base locale.
   */
  if (!isInitialized) {
    const t = settings.language === "fr" ? fr : en;
    return (
      <I18nProvider language={settings.language}>
        <div className="bg-background flex h-screen w-screen items-center justify-center">
          <div className="text-center">
            {/* Animation de chargement minimaliste */}
            <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
            <p className="text-muted-foreground">{t.common.loading}</p>
          </div>
        </div>
      </I18nProvider>
    );
  }

  /**
   * --- ÉTAPE 2 : Affichage de la page d’onboarding ---
   * Si l’utilisateur n’a pas encore terminé le tutoriel, on le redirige ici.
   */
  if (!settings.onboardingCompleted) {
    return (
      <I18nProvider language={settings.language}>
        <BrowserRouter>
          <OnboardingPage onComplete={handleCompleteOnboarding} />
        </BrowserRouter>
      </I18nProvider>
    );
  }

  /**
   * --- ÉTAPE 3 : Application principale ---
   * Une fois l’onboarding terminé, on affiche le Dashboard et ses routes internes.
   */
  return (
    <I18nProvider language={settings.language}>
      <BrowserRouter>
        <Routes>
          {/* Route d’accueil (redirige vers l’onboarding si besoin) */}
          <Route
            path="/"
            element={<OnboardingPage onComplete={handleCompleteOnboarding} />}
          />

          {/* Layout principal contenant les vues du dashboard */}
          <Route path="dashboard" element={<DashboardLayout />}>
            {/* Vue par défaut : Kanban */}
            <Route
              index
              element={
                <KanbanViewPage
                  applications={applications}
                  onEdit={handleEditApplication}
                  onDelete={handleDeleteApplication}
                  onStatusChange={handleStatusChange}
                  onAdd={handleAddApplication}
                />
              }
            />

            {/* Autres vues disponibles dans la navigation */}
            <Route
              path="kanban-view"
              element={
                <KanbanViewPage
                  applications={applications}
                  onEdit={handleEditApplication}
                  onDelete={handleDeleteApplication}
                  onStatusChange={handleStatusChange}
                  onAdd={handleAddApplication}
                />
              }
            />
            <Route
              path="list-view"
              element={
                <ListView
                  applications={applications}
                  onEdit={handleEditApplication}
                  onDelete={handleDeleteApplication}
                  onAdd={handleAddApplication}
                />
              }
            />
            <Route
              path="statistics"
              element={<StatisticsPage applications={applications} />}
            />
            <Route
              path="task"
              element={<TasksPage applications={applications} />}
            />
            <Route path="notes" element={<NotesPage />} />
            <Route
              path="import-or-export"
              element={<ImportExportPage onDataImported={loadApplications} />}
            />
            <Route
              path="settings"
              element={
                <SettingsPage
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              }
            />
          </Route>
        </Routes>

        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveApplication}
          application={editingApplication}
        />

        {/* Toast global pour les notifications (succès, erreur, etc.) */}
        <Toaster position="top-right" />
      </BrowserRouter>
    </I18nProvider>
  );
};

export default App;

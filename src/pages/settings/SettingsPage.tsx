/**
 * SettingsPage
 * Page principale des paramètres.
 * Gère la logique d’état, la synchronisation avec IndexedDB,
 * et orchestre les sous-composants UI.
 */

import { useState, useEffect } from "react";
import type { AppSettings } from "../../types";
import { useTranslation } from "../../lib/i18n";
import { db } from "../../lib/db";
import toast from "react-hot-toast";
import { SettingsHeader } from "./components/SettingsHeader";
import { AppearanceSettings } from "./components/AppearanceSettings";
import { LanguageSettings } from "./components/LanguageSettings";
import { GeneralSettings } from "./components/GeneralSettings";
import { DangerZone } from "./components/DangerZone";
import { SaveButton } from "./components/SaveButton";
import { AboutCard } from "./components/AboutCard";

export function SettingsPage({
  settings,
  onSettingsChange,
}: {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [clearDataDialogOpen, setClearDataDialogOpen] = useState(false);
  const [resetAppDialogOpen, setResetAppDialogOpen] = useState(false);
  const { t } = useTranslation();

  // Synchroniser les paramètres locaux si props changent
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  /** Gestion du thème (light/dark) */
  const handleThemeChange = (value: string) => {
    if (value !== "light" && value !== "dark") return;
    const newSettings = { ...localSettings, theme: value as "light" | "dark" };
    setLocalSettings(newSettings);
    document.documentElement.classList.toggle("dark", value === "dark");
    onSettingsChange(newSettings);
  };

  /** Gestion de la langue (fr/en) */
  const handleLanguageChange = (value: string) => {
    if (value !== "fr" && value !== "en") return;
    const newSettings = { ...localSettings, language: value as "fr" | "en" };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  /** Sauvegarde dans IndexedDB */
  const handleSave = async () => {
    try {
      await db.updateSettings(localSettings);
      onSettingsChange(localSettings);
      toast.success(t.toast.success.settingsSaved);
    } catch {
      toast.error(t.toast.error.saveSettings);
    }
  };

  /** Suppression des données */
  const handleClearData = async () => {
    try {
      await db.clearAllData();
      setClearDataDialogOpen(false);
      toast.success(t.toast.success.dataCleared);
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast.error(t.toast.error.clearData);
    }
  };

  /** Réinitialisation complète */
  const handleReset = async () => {
    try {
      await db.clearAllData();
      const defaultSettings: AppSettings = {
        theme: "light",
        language: "fr",
        autoSave: true,
        onboardingCompleted: false,
      };
      await db.updateSettings(defaultSettings);
      onSettingsChange(defaultSettings);
      setResetAppDialogOpen(false);
      toast.success(t.toast.success.appReset);
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast.error(t.toast.error.resetApp);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-4 lg:p-6">
      <SettingsHeader t={t} />

      <div className="space-y-6">
        <AppearanceSettings
          theme={localSettings.theme}
          onThemeChange={handleThemeChange}
          t={t}
        />

        <LanguageSettings
          language={localSettings.language}
          onLanguageChange={handleLanguageChange}
          t={t}
        />

        <GeneralSettings
          autoSave={localSettings.autoSave}
          onToggleAutoSave={(value) =>
            setLocalSettings({ ...localSettings, autoSave: value })
          }
          t={t}
        />

        <DangerZone
          t={t}
          onClearData={() => setClearDataDialogOpen(true)}
          onResetApp={() => setResetAppDialogOpen(true)}
          clearDataDialogOpen={clearDataDialogOpen}
          resetAppDialogOpen={resetAppDialogOpen}
          setClearDataDialogOpen={setClearDataDialogOpen}
          setResetAppDialogOpen={setResetAppDialogOpen}
          handleClearData={handleClearData}
          handleReset={handleReset}
        />

        <SaveButton onClick={handleSave} t={t} />

        <AboutCard t={t} />
      </div>
    </div>
  );
}

export default SettingsPage;

/**
 * Navbar.tsx
 * --------------------
 * Composant principal de la barre de navigation.
 * - Gère la navigation entre les vues principales (Kanban, Liste, etc.)
 * - Permet de basculer le thème (clair/sombre)
 * - S’adapte au responsive (menu mobile avec Sheet)
 * - Intègre la localisation (FR/EN)
 */

import {
  LayoutDashboard,
  List,
  Kanban,
  FileDown,
  Settings,
  Moon,
  Sun,
  CheckSquare,
  StickyNote,
  Menu,
  Globe,
} from "lucide-react";

import { useState, useEffect } from "react";
import { db } from "../../lib/db";
import { Button } from "../ui/button";
import { useTranslation } from "../../lib/i18n";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet";
import { useNavigate, useLocation } from "react-router-dom";
import type { AppSettings } from "../../types";

function Navbar() {
  // --- Hooks de navigation ---
  const navigate = useNavigate();
  const location = useLocation();
  const { t, locale } = useTranslation();

  // État d'ouverture du menu mobile
  const [isOpen, setIsOpen] = useState(false);

  // Vue actuelle déduite de l'URL
  const [currentView, setCurrentView] = useState("");

  // Paramètres utilisateur
  const [settings, setSettings] = useState<AppSettings>({
    theme: "light",
    language: "fr",
    autoSave: true,
    onboardingCompleted: false,
  });

  // --- Synchronisation de l'état avec l'URL ---
  useEffect(() => {
    // Détermine la vue active en fonction du chemin actuel
    const path = location.pathname;

    if (path.includes("/kanban-view") || path === "/") {
      setCurrentView("kanban");
    } else if (path.includes("/list-view")) {
      setCurrentView("list");
    } else if (path.includes("/statistics")) {
      setCurrentView("dashboard");
    } else if (path.includes("/task")) {
      setCurrentView("tasks");
    } else if (path.includes("/notes")) {
      setCurrentView("notes");
    } else if (path.includes("/import-or-export")) {
      setCurrentView("import-export");
    } else if (path.includes("/settings")) {
      setCurrentView("settings");
    } else {
      setCurrentView(""); // Aucune vue active reconnue
    }
  }, [location.pathname]); // Se déclenche à chaque changement d'URL

  // --- Définition des onglets de navigation ---
  const navItems = [
    {
      id: "kanban",
      label: t.navbar.kanban,
      icon: Kanban,
      path: "/kanban-view",
    },
    { id: "list", label: t.navbar.list, icon: List, path: "/list-view" },
    {
      id: "dashboard",
      label: t.navbar.dashboard,
      icon: LayoutDashboard,
      path: "/statistics",
    },
    { id: "tasks", label: t.navbar.tasks, icon: CheckSquare, path: "/task" },
    { id: "notes", label: t.navbar.notes, icon: StickyNote, path: "/notes" },
    // {
    //   id: "import-export",
    //   label: t.navbar.importExport,
    //   icon: FileDown,
    //   path: "/import-or-export",
    // },
    {
      id: "settings",
      label: t.navbar.settings,
      icon: Settings,
      path: "/settings",
    },
  ];

  /**
   * Redirige vers la page correspondante
   */
  const handleNavClick = (path: string, id: string) => {
    setIsOpen(false);
    setCurrentView(id);
    navigate(path);
  };

  /**
   * Bascule entre les thèmes
   */
  const handleThemeToggle = async () => {
    const newTheme = (settings.theme === "light" ? "dark" : "light") as
      | "light"
      | "dark";
    const newSettings: AppSettings = { ...settings, theme: newTheme };

    // Applique le thème au DOM
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Met à jour l'état et persiste
    setSettings(newSettings);
    await db.updateSettings(newSettings);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // --- Rendu principal ---
  return (
    <>
      {/* Barre de navigation */}
      <nav className="bg-card sticky top-0 z-50 w-full border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Titre */}
            <div className="flex items-center gap-2">
              <div
                className="bg-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg"
                onClick={() => navigate("/")}
              >
                <Kanban className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-semibold">{t.navbar.appName}</span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavClick(item.path, item.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* Section droite */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Indicateur de langue */}
              <div className="bg-muted/50 hidden items-center gap-2 rounded-md px-3 py-1.5 sm:flex lg:flex">
                <Globe className="text-muted-foreground h-4 w-4" />
                <span className="hidden text-sm font-medium sm:flex md:inline lg:flex">
                  {locale === "fr" ? "FR" : "EN"}
                </span>
                <span className="text-sm font-medium md:hidden">
                  {locale.toUpperCase()}
                </span>
              </div>

              {/* Bouton thème */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
                className="hidden rounded-full lg:inline-flex"
                aria-label={
                  settings.theme === "light"
                    ? t.settings.appearance.theme.dark
                    : t.settings.appearance.theme.light
                }
              >
                {settings.theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Menu mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleMobileMenu}
                aria-label={t.navbar.menu}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{t.navbar.menu}</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => handleNavClick(item.path, item.id)}
                  className="w-full justify-start gap-1.5"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}

            <div className="mt-4 space-y-2 border-t pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  handleThemeToggle();
                  setIsOpen(false);
                }}
                className="w-full justify-start"
              >
                {settings.theme === "light" ? (
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    <span>{t.settings.appearance.theme.dark}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>{t.settings.appearance.theme.light}</span>
                  </div>
                )}
              </Button>

              <div className="bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2">
                <Globe className="text-muted-foreground h-4 w-4" />
                <span className="text-sm">
                  {locale === "fr" ? "Français" : "English"}
                </span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Navbar;

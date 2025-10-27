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

import { useState } from "react";
import { db } from "../../lib/db";
import { Button } from "../ui/button";
import { useTranslation } from "../../lib/i18n";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet";
import { useNavigate } from "react-router-dom";
import type { AppSettings } from "../../types";

function Navbar() {
  // --- Hooks et état de navigation ---
  const navigate = useNavigate();
  const { t, locale } = useTranslation();

  // État d’ouverture du menu mobile
  const [isOpen, setIsOpen] = useState(false);

  // Vue actuellement active (utile pour le style actif)
  const [currentView, setCurrentView] = useState("");

  // Paramètres utilisateur chargés depuis la base locale (IndexedDB)
  const [settings, setSettings] = useState<AppSettings>({
    theme: "light",
    language: "fr",
    autoSave: true,
    onboardingCompleted: false,
  });

  // --- Définition des onglets de navigation ---
  // Chaque item contient un id unique, un label traduit et une icône.
  const navItems = [
    { id: "kanban", label: t.navbar.kanban, icon: Kanban },
    { id: "list", label: t.navbar.list, icon: List },
    { id: "dashboard", label: t.navbar.dashboard, icon: LayoutDashboard },
    { id: "tasks", label: t.navbar.tasks, icon: CheckSquare },
    { id: "notes", label: t.navbar.notes, icon: StickyNote },
    { id: "import-export", label: t.navbar.importExport, icon: FileDown },
    { id: "settings", label: t.navbar.settings, icon: Settings },
  ];

  /**
   * Redirige l'utilisateur vers la page correspondant à l'id cliqué.
   * @param id - Identifiant du menu sélectionné (ex: "kanban", "tasks")
   */
  const handleNavClick = (id: string) => {
    let link;

    switch (id) {
      case "kanban":
        link = "kanban-view";
        break;
      case "list":
        link = "list-view";
        break;
      case "dashboard":
        link = "statistics";
        break;
      case "tasks":
        link = "task";
        break;
      case "notes":
        link = "notes";
        break;
      case "import-export":
        link = "import-or-export";
        break;
      case "settings":
        link = "settings";
        break;
      default:
        link = "kanban-view";
        break;
    }

    // Ferme le menu mobile et met à jour la vue courante
    setIsOpen(false);
    setCurrentView(id);

    // Effectue la navigation
    return navigate(link);
  };

  /**
   * Permet de basculer entre le thème clair et sombre.
   * Met à jour à la fois le DOM et la base locale (IndexedDB).
   */
  const handleThemeToggle = async () => {
    const newTheme = (settings.theme === "light" ? "dark" : "light") as
      | "light"
      | "dark";
    const newSettings: AppSettings = { ...settings, theme: newTheme };

    // Applique la classe dark directement sur le root HTML
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Met à jour l’état et persiste les paramètres
    setSettings(newSettings);
    await db.updateSettings(newSettings);
  };

  /** Ouvre ou ferme le menu mobile. */
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // --- Rendu principal ---
  return (
    <>
      {/* --- Barre de navigation principale --- */}
      <nav className="bg-card sticky top-0 z-50 w-full border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* --- Logo + Titre --- */}
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
                <Kanban className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-semibold">{t.navbar.appName}</span>
            </div>

            {/* --- Menu Desktop (affiché sur grands écrans) --- */}
            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* --- Section droite : Langue, Thème, Menu mobile --- */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Indicateur de langue (visible uniquement sur écrans ≥ sm) */}
              <div className="bg-muted/50 hidden items-center gap-2 rounded-md px-3 py-1.5 sm:flex lg:flex">
                <Globe className="text-muted-foreground h-4 w-4" />

                {/* Version abrégée ou complète selon la taille de l’écran */}
                <span className="hidden text-sm font-medium sm:flex md:inline lg:flex">
                  {locale === "fr" ? "FR" : "EN"}
                </span>
                <span className="text-sm font-medium md:hidden">
                  {locale.toUpperCase()}
                </span>
              </div>

              {/* Bouton pour basculer le thème (visible uniquement sur Desktop) */}
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

              {/* Bouton d’ouverture du menu mobile */}
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

      {/* --- Menu Mobile (Slide-in via Sheet) --- */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{t.navbar.menu}</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-2">
            {/* Liste des liens de navigation (version mobile) */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full justify-start"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}

            {/* Section supplémentaire : Thème + Langue */}
            <div className="mt-4 space-y-2 border-t pt-4">
              {/* Toggle du thème (mobile) */}
              <Button
                variant="ghost"
                onClick={() => {
                  handleThemeToggle();
                  setIsOpen(false);
                }}
                className="w-full justify-start"
              >
                {settings.theme === "light" ? (
                  <>
                    <Moon className="h-4 w-4" />
                    <span>{t.settings.appearance.theme.dark}</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    <span>{t.settings.appearance.theme.light}</span>
                  </>
                )}
              </Button>

              {/* Indicateur de langue (mobile) */}
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

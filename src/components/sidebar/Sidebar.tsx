// import {
//   LayoutDashboard,
//   List,
//   Kanban,
//   FileDown,
//   Settings,
//   Moon,
//   Sun,
//   CheckSquare,
//   StickyNote,
//   Globe,
//   Menu,
//   X,
//   ChevronLeft,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useTranslation } from "../../lib/i18n";
// import { Button } from "../ui/button";

// interface SidebarProps {
//   currentView: string;
//   onViewChange: (view: string) => void;
//   theme: "light" | "dark";
//   onThemeToggle: () => void;
//   onCollapsedChange?: (collapsed: boolean) => void;
// }

// export function Sidebar({
//   currentView,
//   onViewChange,
//   theme,
//   onThemeToggle,
//   onCollapsedChange,
// }: SidebarProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const { t, locale } = useTranslation();

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isOpen && window.innerWidth < 1024) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const navItems = [
//     { id: "kanban", label: t.navbar.kanban, icon: Kanban },
//     { id: "list", label: t.navbar.list, icon: List },
//     { id: "dashboard", label: t.navbar.dashboard, icon: LayoutDashboard },
//     { id: "tasks", label: t.navbar.tasks, icon: CheckSquare },
//     { id: "notes", label: t.navbar.notes, icon: StickyNote },
//     { id: "import-export", label: t.navbar.importExport, icon: FileDown },
//     { id: "settings", label: t.navbar.settings, icon: Settings },
//   ];

//   const handleNavClick = (id: string) => {
//     onViewChange(id);
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile Menu Button - Fixed at top */}
//       <div className="bg-card fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b px-4 py-3 shadow-sm lg:hidden">
//         <div className="flex items-center gap-2">
//           <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
//             <Kanban className="text-primary-foreground h-5 w-5" />
//           </div>
//           <span className="font-semibold">{t.navbar.appName}</span>
//         </div>

//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={t.navbar.menu}
//         >
//           <Menu className="h-5 w-5" />
//         </Button>
//       </div>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`bg-card fixed top-0 bottom-0 left-0 flex flex-col border-r shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "z-50 translate-x-0" : "z-50 -translate-x-full lg:translate-x-0"} ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between border-b px-4 py-4">
//           {!isCollapsed && (
//             <div className="flex min-w-0 items-center gap-2">
//               <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
//                 <Kanban className="text-primary-foreground h-5 w-5" />
//               </div>
//               <span className="truncate font-semibold">{t.navbar.appName}</span>
//             </div>
//           )}

//           {isCollapsed && (
//             <div className="flex w-full justify-center">
//               <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
//                 <Kanban className="text-primary-foreground h-5 w-5" />
//               </div>
//             </div>
//           )}

//           {/* Close button (mobile) / Collapse button (desktop) */}
//           {!isCollapsed && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 if (window.innerWidth < 1024) {
//                   setIsOpen(false);
//                 } else {
//                   setIsCollapsed(true);
//                   if (onCollapsedChange) {
//                     onCollapsedChange(true);
//                   }
//                 }
//               }}
//               className="shrink-0"
//               aria-label="Collapse sidebar"
//             >
//               <X className="h-5 w-5 lg:hidden" />
//               <ChevronLeft className="hidden h-5 w-5 transition-transform lg:block" />
//             </Button>
//           )}

//           {/* Expand button when collapsed */}
//           {isCollapsed && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 setIsCollapsed(false);
//                 if (onCollapsedChange) {
//                   onCollapsedChange(false);
//                 }
//               }}
//               className="absolute top-4 right-2 hidden lg:flex"
//               aria-label="Expand sidebar"
//             >
//               <ChevronLeft className="h-5 w-5 rotate-180" />
//             </Button>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto px-2 py-4">
//           <div className="flex flex-col gap-1">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentView === item.id;
//               return (
//                 <Button
//                   key={item.id}
//                   variant={isActive ? "default" : "ghost"}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`w-full justify-start ${isCollapsed ? "lg:justify-center lg:px-2" : ""} `}
//                   title={isCollapsed ? item.label : undefined}
//                 >
//                   <Icon className="h-5 w-5 shrink-0" />
//                   {!isCollapsed && <span>{item.label}</span>}
//                 </Button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Footer - Theme & Language */}
//         <div className="space-y-1 border-t p-2">
//           {/* Theme Toggle */}
//           <Button
//             variant="ghost"
//             onClick={onThemeToggle}
//             className={`w-full ${isCollapsed ? "lg:justify-center lg:px-2" : "justify-start"} `}
//             title={
//               isCollapsed
//                 ? theme === "light"
//                   ? t.settings.appearance.theme.dark
//                   : t.settings.appearance.theme.light
//                 : undefined
//             }
//           >
//             {theme === "light" ? (
//               <>
//                 <Moon className="h-5 w-5 shrink-0" />
//                 {!isCollapsed && (
//                   <span>{t.settings.appearance.theme.dark}</span>
//                 )}
//               </>
//             ) : (
//               <>
//                 <Sun className="h-5 w-5 shrink-0" />
//                 {!isCollapsed && (
//                   <span>{t.settings.appearance.theme.light}</span>
//                 )}
//               </>
//             )}
//           </Button>

//           {/* Language Indicator */}
//           <div
//             className={`bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2 ${isCollapsed ? "lg:justify-center lg:px-2" : ""} `}
//             title={
//               isCollapsed
//                 ? locale === "fr"
//                   ? "Français"
//                   : "English"
//                 : undefined
//             }
//           >
//             <Globe className="text-muted-foreground h-5 w-5 shrink-0" />
//             {!isCollapsed && (
//               <span className="text-sm">
//                 {locale === "fr" ? "Français" : "English"}
//               </span>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

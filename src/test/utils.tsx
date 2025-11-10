/**
 * Custom Test Utilities
 * ═════════════════════════════════════════════════════════════
 *
 * Une fonction render() spécialisée pour notre projet.
 *
 * ANALOGIE :
 * ─────────
 * Imagine que tu veux tester un restaurateur :
 *
 * ❌ MAU : Tu lui dis : "Prépare un steak !" dans sa cuisine seule
 *    → Il ne peut pas utiliser l'électricité, le gaz, les ustensiles...
 *
 * ✅ BON : Tu lui dis : "Prépare un steak !" dans SON restaurateur ÉQUIPÉ
 *    → Il a tout : l'électricité, le gaz, les couteaux...
 *
 * C'est exactement ça ! On enveloppe le composant avec ses "outils" (providers)
 */

import React from "react";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

/**
 * AllTheProviders
 * ────────────────
 * Composant qui enveloppe nos composants de test avec tous les contextes/providers.
 *
 * QUELS providers ?
 * ───────────────
 *
 * Dans notre app, nous avons :
 * ✅ React Router (BrowserRouter) → pour les liens et routes
 * ⚠️  I18n Provider (LanguageProvider) → pour la traduction
 * ⚠️  Zustand store → pour l'état global
 *
 * EN CE MOMENT : On n'en a pas vraiment besoin pour les tests simples
 * MAIS : Si tu avais un provider, tu le mettras ici !
 *
 * Exemple (commenté) si on avait un LanguageProvider :
 * ──────────────────────────────────────────────────
 * import { LanguageProvider } from '@lib/i18n'
 *
 * const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
 *   return (
 *     <LanguageProvider>
 *       {children}
 *     </LanguageProvider>
 *   )
 * }
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

/**
 * Custom render function
 * ──────────────────────
 *
 * Au lieu d'utiliser render() du React Testing Library,
 * on utilise notre version customisée render()
 *
 * DIFFÉRENCE :
 * ────────────
 *
 * ❌ render(<MyComponent />)
 *    → MyComponent sans ses providers
 *
 * ✅ render(<MyComponent />)
 *    → MyComponent AVEC tous ses providers (grâce à our custom render)
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

/**
 * Re-export de React Testing Library
 * ────────────────────────────────────
 *
 * Cette ligne est TRÈS importante !
 *
 * Elle dit : "Exporte TOUT du React Testing Library..."
 * Sauf : render (qu'on remplace par notre version)
 *
 * Donc quand quelqu'un importe depuis ce fichier :
 *
 *   import { render, screen } from '@test/utils'
 *
 * - render        → Notre version customisée ✅
 * - screen       → La version officielle du RTL ✅
 * - fireEvent    → La version officielle du RTL ✅
 * - waitFor      → La version officielle du RTL ✅
 * - etc...
 */
export * from "@testing-library/react";

/**
 * Export notre render customisée
 * ───────────────────────────────
 * Remplace le render du RTL par défaut
 */
export { customRender as render };

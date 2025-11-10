/**
 * Vitest Configuration
 * ═══════════════════════════════════════════════════════════
 *
 * Ce fichier configure Vitest pour notre projet React + TypeScript
 *
 * Qu'est-ce que Vitest ?
 * ─────────────────────
 * Vitest est un framework de test ultra-rapide, compatible avec Jest.
 * Il comprend React, TypeScript, et utilise jsdom pour simuler un navigateur.
 *
 * Configuration expliquée :
 * ──────────────────────
 * - globals: true         → N'importe quel fichier peut utiliser describe(), it()
 * - environment: 'jsdom'  → Simule le navigateur (DOM, window, document)
 * - setupFiles            → Fichier lancé avant chaque test (configuration globale)
 * - coverage              → Options pour les rapports de couverture
 * - resolve.alias         → Chemins d'import raccourcis (@components, @types, etc.)
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    /**
     * globals: true
     * ─────────────
     * Permet d'utiliser describe(), it(), expect() sans les importer
     *
     * AVEC globals: true  →  it('...', () => {})  ✅
     * SANS globals: true  →  import { it } from 'vitest'; it('...', () => {})
     */
    globals: true,

    /**
     * environment: 'jsdom'
     * ───────────────────
     * jsdom = simulateur de navigateur en Node.js
     * Crée un fake DOM pour que React Testing Library puisse fonctionner
     *
     * ✅ jsdom    → Pour tester des composants React (besoin du DOM)
     * ❌ node     → Pour tester juste du code JavaScript pur
     */
    environment: "jsdom",

    /**
     * setupFiles
     * ──────────
     * Fichier lancé AVANT chaque test
     * Permet de configurer les choses globalement (imports, mocks, etc.)
     */
    setupFiles: "./src/test/setup.ts",

    /**
     * coverage
     * ────────
     * Configuration du rapport de couverture (test coverage)
     *
     * Couverture = "Quel % du code est exécuté par les tests ?"
     *
     * Exemples :
     * - 80% coverage = 80% du code est testé
     * - Si tu as une fonction jamais appelée → pas dans la couverture
     */
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      exclude: ["node_modules/", "src/test/", "dist/"],
    },
  },

  /**
   * resolve.alias
   * ──────────────
   * Permet d'utiliser des chemins raccourcis dans les imports
   *
   * AVEC alias    → import Button from '@components/ui/Button'
   * SANS alias    → import Button from '../../../components/ui/Button'
   *
   * C'est TRÈS important pour la lisibilité et la maintenance !
   */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});

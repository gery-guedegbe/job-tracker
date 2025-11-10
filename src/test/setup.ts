/**
 * Test Setup File
 * ════════════════════════════════════════════════════════════
 *
 * Ce fichier est exécuté AVANT chaque test.
 * Il configure l'environnement global pour tous les tests.
 *
 * Analogie :
 * ─────────
 * Comme les échauffements avant un match de foot :
 * - Tout le monde s'échauffe ensemble
 * - Puis chaque joueur fait son match (test)
 */

// Import de vitest et React Testing Library
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

/**
 * cleanup()
 * ─────────
 * Nettoie le DOM après chaque test.
 *
 * POURQUOI c'est important ?
 * ──────────────────────────
 * Chaque test crée des composants React qui s'affichent dans un fake-DOM.
 * Si on ne les nettoie pas, le test suivant verra des résidus du test précédent !
 *
 * Exemple problématique SANS cleanup :
 * ──────────────────────────────────────
 *   Test 1 : Crée un bouton "Save"  ✅
 *   Test 2 : Cherche le bouton "Save" → ❌ Trouve celui du Test 1 !!!
 *
 * Avec cleanup :
 * ──────────────
 *   Test 1 : Crée un bouton "Save"  ✅  → Cleanup l'efface
 *   Test 2 : Cherche le bouton "Save" → ✅ Rien trouvé (c'est bon !)
 */
afterEach(() => {
  cleanup();
});

/**
 * @testing-library/jest-dom
 * ──────────────────────────
 * Import spécial qui ajoute des "super-matchers" pour React Testing Library
 *
 * Exemples de matchers qu'on peut utiliser grâce à cet import :
 * ────────────────────────────────────────────────────────────
 *
 * expect(element).toBeInTheDocument()     // Élément existe dans le DOM
 * expect(element).toBeVisible()           // Élément est visible
 * expect(element).toBeDisabled()          // Bouton est disabled
 * expect(input).toHaveValue('texte')     // Input contient 'texte'
 * expect(element).toHaveClass('active')   // Élément a la classe CSS 'active'
 * expect(element).toHaveTextContent('Hi') // Élément contient le texte
 *
 * Sans cet import, on ne pourrait utiliser que les matchers basiques :
 * expect(x).toBe(y)
 * expect(x).toEqual(y)
 * etc.
 */

/**
 * Optional: Mock global objects
 * ─────────────────────────────
 *
 * Si ton app utilise localStorage, localStorage, window.fetch, etc.,
 * tu pourrais les mocker ici (les faker).
 *
 * Exemples (non actifs) :
 * ───────────────────────
 *
 * // Mock localStorage
 * const localStorageMock = {
 *   getItem: vi.fn(),
 *   setItem: vi.fn(),
 *   removeItem: vi.fn(),
 * }
 * Object.defineProperty(window, 'localStorage', { value: localStorageMock })
 *
 * // Mock fetch
 * global.fetch = vi.fn()
 */

console.log("✅ Test setup loaded - Environment ready for testing");
